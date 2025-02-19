
import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EventCard } from "@/components/events/EventCard";
import { RegisterDialog } from "@/components/events/RegisterDialog";

// Temporary mock data - will be replaced with actual data from backend
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

const Events = () => {
  return (
    <Layout>
      <div className="space-y-8 fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Événements à Venir
          </h1>
          <p className="mt-2 text-gray-600">
            Découvrez les prochains événements de la Faculté des Sciences Ben M'Sik
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
