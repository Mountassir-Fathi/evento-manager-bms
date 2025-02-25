
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegistrationFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

export function RegistrationForm({ onSubmit, loading }: RegistrationFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 py-4">
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
  );
}

