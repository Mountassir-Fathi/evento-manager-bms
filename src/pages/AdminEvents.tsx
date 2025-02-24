
import { Layout } from "@/components/layout/Layout";
import { AdminEventCard } from "@/components/admin/AdminEventCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateEventDialog } from "@/components/admin/CreateEventDialog";
import { useState } from "react";

// Using mock data with images
const events = [
  {
    id: 1,
    title: "Journée IoT Workshop",
    date: "2025-02-22",
    startTime: "10:00",
    endTime: "12:00",
    location: "Salle Orange",
    description: "Workshop sur l'Internet des Objets et ses applications dans l'industrie 4.0",
    image: "/lovable-uploads/c1eeda35-474f-478d-a8a4-26dee84bc4f3.png"
  },
  {
    id: 2,
    title: "Conférence IA & Big Data",
    date: "2025-03-15",
    startTime: "14:00",
    endTime: "17:00",
    location: "Amphithéâtre A",
    description: "Les dernières avancées en Intelligence Artificielle et analyse de données massives",
    image: "/lovable-uploads/029de18b-67e4-4ab6-8923-9f36c9a9f442.png"
  }
];

const AdminEvents = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="flex flex-col items-center gap-4">
          <img 
            src="/lovable-uploads/d2c5983d-3f58-4cac-8cdf-80c1338ae4e9.png" 
            alt="FSBM Logo" 
            className="h-32 object-contain"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Administration des Événements
          </h1>
          <p className="mt-2 text-gray-600">
            Gestion et suivi des événements de la Faculté des Sciences Ben M'Sik
          </p>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="mt-4"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Créer un nouvel événement
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <AdminEventCard key={event.id} event={event} />
          ))}
        </div>

        <CreateEventDialog 
          open={showCreateDialog} 
          onOpenChange={setShowCreateDialog} 
        />
      </div>
    </Layout>
  );
};

export default AdminEvents;
