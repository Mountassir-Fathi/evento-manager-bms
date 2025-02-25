
import { Button } from "@/components/ui/button";

interface PDFPreviewProps {
  pdfUrl: string;
  onBack: () => void;
  onDownload: () => void;
}

export function PDFPreview({ pdfUrl, onBack, onDownload }: PDFPreviewProps) {
  return (
    <div className="space-y-6" data-pdf-content>
      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title="Prévisualisation de l'invitation"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={onDownload}>
          Télécharger l'invitation
        </Button>
      </div>
    </div>
  );
}

