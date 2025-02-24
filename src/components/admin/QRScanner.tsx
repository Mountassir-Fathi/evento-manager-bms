
import { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

interface QRScannerProps {
  onSuccess: (code: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ onSuccess, open, onOpenChange }: QRScannerProps) {
  const [error, setError] = useState<string>("");

  const handleDecode = (result: string) => {
    onSuccess(result);
    onOpenChange(false);
    toast({
      title: "Code QR scanné avec succès",
      description: "Vérification de l'invitation en cours...",
    });
  };

  const handleError = (error: any) => {
    setError("Erreur lors du scan du QR code");
    toast({
      title: "Erreur",
      description: "Impossible de scanner le QR code",
      variant: "destructive",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scanner le QR code de l'invitation</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <QrScanner
            onDecode={handleDecode}
            onError={handleError}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
