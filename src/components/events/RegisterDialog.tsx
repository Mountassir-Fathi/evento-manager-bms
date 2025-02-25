
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generatePDF } from "@/utils/pdfGenerator";
import { RegistrationForm } from "./RegistrationForm";
import { PDFPreview } from "./PDFPreview";
import html2pdf from "html2pdf.js";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const pdfDoc = await generatePDF(event, formData);
      
      // Create PDF preview
      const pdfBlob = await html2pdf()
        .from(document.querySelector('[data-pdf-content]'))
        .outputPdf('blob');
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
      await generatePDF(event, formData);
      
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
          <RegistrationForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <PDFPreview
            pdfUrl={pdfPreview}
            onBack={() => setShowPreview(false)}
            onDownload={handleDownload}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

