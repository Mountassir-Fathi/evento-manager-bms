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
  const [pdfPreview, setPdfPreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  
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
        <!-- Background Logo -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.1; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
          <img src="/lovable-uploads/14722ca5-d5ab-44f8-9cfd-5ac91a63f7e2.png" alt="Logo FSBM Background" style="max-width: 80%; max-height: 80%; object-fit: contain;">
        </div>

        <!-- Header with institutional logo -->
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="/lovable-uploads/dd20a8c4-f2b3-4438-af9e-4d9226a1dfd2.png" alt="Logo FSBM Header" style="height: 100px; margin: 0 auto;">
        </div>
        
        <!-- Decorative border -->
        <div style="border: 2px solid #1a365d; border-radius: 10px; padding: 30px; position: relative; background-color: rgba(255, 255, 255, 0.95);">
          <!-- Title -->
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a365d; font-size: 32px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">
              Invitation
            </h1>
            <h2 style="color: #2563eb; font-size: 24px; margin: 15px 0; font-weight: 600;">
              ${event.title}
            </h2>
          </div>
          
          <!-- Event details with elegant styling -->
          <div style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                      border: 1px solid #e2e8f0;
                      border-radius: 8px;
                      padding: 25px;
                      margin: 20px 0;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <div style="text-align: center;">
              <p style="margin: 12px 0; font-size: 16px;">
                <strong style="color: #1a365d;">Date :</strong> 
                ${new Date(event.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p style="margin: 12px 0; font-size: 16px;">
                <strong style="color: #1a365d;">Horaire :</strong> 
                ${event.startTime} - ${event.endTime}
              </p>
              <p style="margin: 12px 0; font-size: 16px;">
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
            <h3 style="color: #1a365d; margin-bottom: 15px; font-size: 20px; text-transform: uppercase;">
              Participant
            </h3>
            <p style="font-size: 18px; margin: 5px 0; color: #2563eb;">
              ${formData.get('firstName')} ${formData.get('lastName')}
            </p>
            <p style="font-size: 16px; margin: 5px 0; color: #64748b;">
              ${formData.get('profession')}
            </p>
          </div>
          
          <!-- QR Code section with elegant border -->
          <div style="text-align: center; margin: 30px 0;
                      padding: 20px;
                      border: 1px solid #e2e8f0;
                      border-radius: 8px;
                      background: #ffffff;">
            <img src="${qrCodeData}" alt="QR Code" style="width: 150px; height: 150px; margin: 0 auto;">
            <p style="margin-top: 10px; font-size: 12px; color: #64748b;">Code d'accès : ${ticketId}</p>
          </div>
          
          <!-- Footer note -->
          <div style="text-align: center;
                      padding: 20px;
                      background: linear-gradient(to right, #1a365d, #2563eb);
                      border-radius: 8px;
                      margin-top: 30px;">
            <p style="margin: 0; color: white; font-weight: bold; font-size: 16px;">
              Merci de présenter ce document le jour de l'événement
            </p>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: 10,
      filename: `invitation-${event.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      console.log('Generating PDF...');
      const pdf = await html2pdf().set(opt).from(element);
      console.log('PDF generated successfully');
      return pdf;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const pdfDoc = await generatePDF(formData);
      const pdfBlob = await pdfDoc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfPreview(pdfUrl);
      setShowPreview(true);
      
      toast({
        title: "Invitation générée!",
        description: "Vous pouvez maintenant prévisualiser et télécharger votre invitation.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération de l'invitation.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      const formData = new FormData(document.querySelector('form')!);
      const pdfDoc = await generatePDF(formData);
      console.log('Downloading PDF...');
      await pdfDoc.save();
      console.log('PDF downloaded successfully');
      
      toast({
        title: "Téléchargement réussi",
        description: "Votre invitation a été téléchargée avec succès.",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement de l'invitation.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={showPreview ? "sm:max-w-[800px]" : "sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>
            {showPreview ? "Prévisualisation de l'invitation" : "Inscription à l'événement"}
          </DialogTitle>
        </DialogHeader>
        
        {!showPreview ? (
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
              {loading ? "Génération de l'invitation..." : "Générer l'invitation"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
              <iframe
                src={pdfPreview}
                className="w-full h-full"
                title="Prévisualisation de l'invitation"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Retour
              </Button>
              <Button onClick={handleDownload}>
                Télécharger l'invitation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
