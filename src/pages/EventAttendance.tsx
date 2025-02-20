
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
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
  description: "Workshop sur l'Internet des Objets et ses applications dans l'industrie 4.0"
};

const attendees = [
  { id: 1, firstName: "Jean", lastName: "Dupont", profile: "Professeur" },
  { id: 2, firstName: "Marie", lastName: "Martin", profile: "Étudiant" },
  { id: 3, firstName: "Pierre", lastName: "Bernard", profile: "Étudiant" },
  { id: 4, firstName: "Sophie", lastName: "Dubois", profile: "Professeur" },
  { id: 5, firstName: "Lucas", lastName: "Petit", profile: "Invité" },
];

const EventAttendance = () => {
  // Calculate statistics
  const stats = attendees.reduce((acc, attendee) => {
    acc[attendee.profile] = (acc[attendee.profile] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(stats).map(([profile, count]) => ({
    profile,
    count
  }));

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
          <h2 className="text-xl font-semibold mb-4">Informations de l'événement</h2>
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
    </Layout>
  );
};

export default EventAttendance;
