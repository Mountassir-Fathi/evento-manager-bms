
import { Layout } from "@/components/layout/Layout";
import { AdminEventCard } from "@/components/admin/AdminEventCard";
import { CreateEventDialog } from "@/components/admin/CreateEventDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

// Using the same mock data structure as Events page
const initialEvents = [
  {
    id: 1,
    title: "Journée IoT Workshop",
    date: "2025-02-22",
    startTime: "10:00",
    endTime: "12:00",
    location: "Salle Orange",
    description: "Workshop sur l'Internet des Objets et ses applications dans l'industrie 4.0",
    imageUrl: "/lovable-uploads/b4359f62-3c36-4aa3-a9d4-0069ad7ef641.png"
  },
  {
    id: 2,
    title: "Conférence IA & Big Data",
    date: "2025-03-15",
    startTime: "14:00",
    endTime: "17:00",
    location: "Amphithéâtre A",
    description: "Les dernières avancées en Intelligence Artificielle et analyse de données massives",
    imageUrl: "/lovable-uploads/2d9e2d65-3e8b-460c-9aee-784afda68404.png"
  }
];

const AdminEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleEventCreate = (newEvent: any) => {
    setEvents([...events, newEvent]);
  };

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Administration des Événements
          </h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel événement
          </Button>
        </div>

        <p className="text-gray-600">
          Gestion et suivi des événements de la Faculté des Sciences Ben M'Sik
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <AdminEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <CreateEventDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onEventCreate={handleEventCreate}
      />
    </Layout>
  );
};

export default AdminEvents;
