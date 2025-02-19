
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode";

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

interface RegisterDialogProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterDialog({ event, open, onOpenChange }: RegisterDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const generateQRCode = async (text: string) => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error("Error generating QR code:", err);
      return "";
    }
  };

  const generatePDF = async (formData: FormData) => {
    const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const qrCodeData = await generateQRCode(ticketId);
    
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="/lovable-uploads/18af67c0-5636-4076-98b9-34eb839fe32a.png" alt="Logo" style="height: 100px;">
        </div>
        
        <h1 style="color: #1a365d; text-align: center; margin-bottom: 20px; font-size: 24px;">
          ${event.title}
        </h1>
        
        <div style="margin-bottom: 30px; text-align: center;">
          <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
          <p style="margin: 5px 0;"><strong>Horaire:</strong> ${event.startTime} - ${event.endTime}</p>
          <p style="margin: 5px 0;"><strong>Lieu:</strong> ${event.location}</p>
        </div>
        
        <div style="margin-bottom: 30px; text-align: center;">
          <p style="margin: 5px 0;"><strong>Participant:</strong></p>
          <p style="margin: 5px 0;">${formData.get('firstName')} ${formData.get('lastName')}</p>
          <p style="margin: 5px 0;">${formData.get('profession')}</p>
        </div>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="${qrCodeData}" alt="QR Code" style="width: 150px; height: 150px;">
          <p style="margin-top: 10px; font-size: 12px; color: #666;">Code d'accès: ${ticketId}</p>
        </div>
        
        <div style="text-align: center; padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0; color: #1a365d; font-weight: bold;">
            Présenter ce fichier le jour de l'événement
          </p>
        </div>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `inscription-${event.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    return html2pdf().set(opt).from(element).save();
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await generatePDF(formData);
      
      toast({
        title: "Inscription réussie!",
        description: "Votre ticket a été généré et le téléchargement va commencer.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du ticket.",
        variant: "destructive"
      });
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inscription à l'événement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" name="lastName" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profession">Profession</Label>
            <Select name="profession" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Professeur">Professeur</SelectItem>
                <SelectItem value="Étudiant">Étudiant</SelectItem>
                <SelectItem value="Invité">Invité</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Génération du ticket..." : "Valider l'inscription"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
