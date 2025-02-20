
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Student {
  id: number;
  codeApogee: string;
  lastName: string;
  firstName: string;
  cin: string;
  cne: string;
  rfidUid: string;
}

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (student: Omit<Student, 'id'>) => void;
  student?: Student | null;
}

export function StudentDialog({ open, onOpenChange, onSubmit, student }: StudentDialogProps) {
  const [formData, setFormData] = useState({
    codeApogee: "",
    lastName: "",
    firstName: "",
    cin: "",
    cne: "",
    rfidUid: ""
  });
  const [waitingForRFID, setWaitingForRFID] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        codeApogee: student.codeApogee,
        lastName: student.lastName,
        firstName: student.firstName,
        cin: student.cin,
        cne: student.cne,
        rfidUid: student.rfidUid
      });
    } else {
      setFormData({
        codeApogee: "",
        lastName: "",
        firstName: "",
        cin: "",
        cne: "",
        rfidUid: ""
      });
    }
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const simulateRFIDRead = () => {
    setWaitingForRFID(true);
    // Simulate RFID reading with a random UID after 2 seconds
    setTimeout(() => {
      const randomUID = Array.from(
        { length: 8 },
        () => Math.floor(Math.random() * 16).toString(16)
      ).join("").toUpperCase();
      
      setFormData(prev => ({ ...prev, rfidUid: randomUID }));
      setWaitingForRFID(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {student ? "Modifier un étudiant" : "Ajouter un étudiant"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="codeApogee">Code Apogée</Label>
            <Input
              id="codeApogee"
              value={formData.codeApogee}
              onChange={(e) => setFormData(prev => ({ ...prev, codeApogee: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cin">CIN</Label>
              <Input
                id="cin"
                value={formData.cin}
                onChange={(e) => setFormData(prev => ({ ...prev, cin: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cne">CNE</Label>
              <Input
                id="cne"
                value={formData.cne}
                onChange={(e) => setFormData(prev => ({ ...prev, cne: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rfidUid">UID Carte RFID</Label>
            <div className="flex gap-2">
              <Input
                id="rfidUid"
                value={formData.rfidUid}
                onChange={(e) => setFormData(prev => ({ ...prev, rfidUid: e.target.value }))}
                readOnly
                required
              />
              <Button
                type="button"
                variant="secondary"
                onClick={simulateRFIDRead}
                disabled={waitingForRFID}
              >
                {waitingForRFID ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Lire carte"
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {student ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
