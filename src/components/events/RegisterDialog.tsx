
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
      <div style="padding: 40px; font-family: Arial, sans-serif; position: relative;">
        <!-- Header with logos -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <img src="/lovable-uploads/2d9e2d65-3e8b-460c-9aee-784afda68404.png" alt="Logo FSBM" style="height: 80px;">
          <img src="/lovable-uploads/22748998-1dc4-40cd-9eb5-f170c6bd78d9.png" alt="Logo Couronne" style="height: 80px;">
        </div>
        
        <!-- Decorative line -->
        <div style="border-top: 2px solid #1a365d; margin: 20px 0;"></div>
        
        <!-- Title -->
        <div style="text-align: center; margin: 30px 0;">
          <h1 style="color: #1a365d; font-size: 28px; margin-bottom: 10px; text-transform: uppercase;">
            Invitation
          </h1>
          <h2 style="color: #2563eb; font-size: 24px; margin: 15px 0;">
            ${event.title}
          </h2>
        </div>
        
        <!-- Event details with sophisticated styling -->
        <div style="background: linear-gradient(to right, #f8fafc, #ffffff);
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center;">
            <p style="margin: 10px 0; font-size: 16px;">
              <strong style="color: #1a365d;">Date :</strong> 
              ${new Date(event.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p style="margin: 10px 0; font-size: 16px;">
              <strong style="color: #1a365d;">Horaire :</strong> 
              ${event.startTime} - ${event.endTime}
            </p>
            <p style="margin: 10px 0; font-size: 16px;">
              <strong style="color: #1a365d;">Lieu :</strong> 
              ${event.location}
            </p>
          </div>
        </div>
        
        <!-- Participant information -->
        <div style="background-color: #f8fafc;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;">
          <h3 style="color: #1a365d; margin-bottom: 15px; font-size: 18px;">Participant</h3>
          <p style="font-size: 16px; margin: 5px 0;">${formData.get('firstName')} ${formData.get('lastName')}</p>
          <p style="font-size: 16px; margin: 5px 0; color: #2563eb;">${formData.get('profession')}</p>
        </div>
        
        <!-- QR Code section -->
        <div style="text-align: center; margin: 30px 0;">
          <img src="${qrCodeData}" alt="QR Code" style="width: 150px; height: 150px; margin: 0 auto;">
          <p style="margin-top: 10px; font-size: 12px; color: #64748b;">Code d'accès : ${ticketId}</p>
        </div>
        
        <!-- Instructions -->
        <div style="text-align: center;
                    padding: 20px;
                    background: linear-gradient(to right, #1a365d, #2563eb);
                    border-radius: 8px;
                    margin-top: 30px;">
          <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">
            Merci de présenter ce document le jour de l'événement
          </p>
        </div>
        
        <!-- Decorative footer -->
        <div style="border-bottom: 2px solid #1a365d; margin: 20px 0;"></div>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `invitation-${event.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
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
