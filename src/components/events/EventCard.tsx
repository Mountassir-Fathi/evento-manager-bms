
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { RegisterDialog } from "./RegisterDialog";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [showRegister, setShowRegister] = useState(false);
  
  const formattedDate = new Date(event.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">{event.description}</p>

        <Button 
          className="w-full"
          onClick={() => setShowRegister(true)}
        >
          S'inscrire
        </Button>
      </div>

      <RegisterDialog
        event={event}
        open={showRegister}
        onOpenChange={setShowRegister}
      />
    </Card>
  );
}
