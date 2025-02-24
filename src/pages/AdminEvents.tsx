
import { Layout } from "@/components/layout/Layout";
import { AdminEventCard } from "@/components/admin/AdminEventCard";

// Using the same mock data structure as Events page
const events = [
  {
    id: 1,
    title: "Journée IoT Workshop",
    date: "2025-02-22",
    startTime: "10:00",
    endTime: "12:00",
    location: "Salle Orange",
    description: "Workshop sur l'Internet des Objets et ses applications dans l'industrie 4.0"
  },
  {
    id: 2,
    title: "Conférence IA & Big Data",
    date: "2025-03-15",
    startTime: "14:00",
    endTime: "17:00",
    location: "Amphithéâtre A",
    description: "Les dernières avancées en Intelligence Artificielle et analyse de données massives"
  }
];

const AdminEvents = () => {
  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Administration des Événements
          </h1>
          <p className="mt-2 text-gray-600">
            Gestion et suivi des événements de la Faculté des Sciences Ben M'Sik
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <AdminEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminEvents;
