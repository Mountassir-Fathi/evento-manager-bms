
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRScanner } from "@/components/admin/QRScanner";
import { useState } from "react";
import { Check, QrCode, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the example
const event = {
  id: 1,
  title: "Journée IoT Workshop",
  date: "2025-02-22",
  startTime: "10:00",
  endTime: "12:00",
  location: "Salle Orange",
  description: "Workshop sur l'Internet des Objets et ses applications dans l'industrie 4.0",
  imageUrl: "/lovable-uploads/b4359f62-3c36-4aa3-a9d4-0069ad7ef641.png"
};

const attendees = [
  { id: 1, firstName: "Jean", lastName: "Dupont", profile: "Professeur" },
  { id: 2, firstName: "Marie", lastName: "Martin", profile: "Étudiant" },
  { id: 3, firstName: "Pierre", lastName: "Bernard", profile: "Étudiant" },
  { id: 4, firstName: "Sophie", lastName: "Dubois", profile: "Professeur" },
  { id: 5, firstName: "Lucas", lastName: "Petit", profile: "Invité" },
];

const EventAttendance = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showValidation, setShowValidation] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Calculate statistics
  const stats = attendees.reduce((acc, attendee) => {
    acc[attendee.profile] = (acc[attendee.profile] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(stats).map(([profile, count]) => ({
    profile,
    count
  }));

  const handleScanSuccess = (code: string) => {
    // Simulate checking if the code exists
    const isValid = code.startsWith("TICKET-");
    setShowValidation(isValid);
    
    setTimeout(() => {
      setShowValidation(null);
      if (isValid) {
        toast({
          title: "Invitation validée",
          description: "L'invité a été ajouté à la liste des présences",
        });
      } else {
        toast({
          title: "Invitation non valide",
          description: "Cette invitation n'est pas reconnue",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Suivi des Présences
          </h1>
          <p className="mt-2 text-gray-600">
            {event.title}
          </p>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Informations de l'événement</h2>
              <div className="space-y-2">
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p><strong>Horaire:</strong> {event.startTime} - {event.endTime}</p>
                <p><strong>Lieu:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
              </div>
            </div>
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Scanner une invitation</h2>
            <Button onClick={() => setShowScanner(true)} variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              Scanner QR Code
            </Button>
          </div>

          {showValidation !== null && (
            <div className={`flex items-center justify-center p-4 rounded-lg ${
              showValidation ? "bg-green-50" : "bg-red-50"
            }`}>
              {showValidation ? (
                <div className="flex items-center text-green-600">
                  <Check className="h-16 w-16" />
                  <span className="ml-2 text-lg font-medium">Invitation validée</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <X className="h-16 w-16" />
                  <span className="ml-2 text-lg font-medium">Invitation non valide</span>
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Statistiques des présences</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="profile" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Liste des présences</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Profil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell>{attendee.lastName}</TableCell>
                    <TableCell>{attendee.firstName}</TableCell>
                    <TableCell>{attendee.profile}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <QRScanner 
        open={showScanner} 
        onOpenChange={setShowScanner}
        onSuccess={handleScanSuccess}
      />
    </Layout>
  );
};

export default EventAttendance;
