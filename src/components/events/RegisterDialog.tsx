
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate "ticket" - this would normally be done server-side
    const downloadUrl = '#'; // This would be a real URL in production
    
    toast({
      title: "Inscription réussie!",
      description: "Votre ticket a été généré. Veuillez le télécharger et le conserver.",
    });
    
    setLoading(false);
    onOpenChange(false);
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
            <Input id="firstName" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profession">Profession</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professor">Professeur</SelectItem>
                <SelectItem value="student">Étudiant</SelectItem>
                <SelectItem value="guest">Invité</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Inscription en cours..." : "Valider l'inscription"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
