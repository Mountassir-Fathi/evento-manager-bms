
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { RegisterDialog } from "./RegisterDialog";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  imageUrl?: string;
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-white to-[#E5DEFF]">
      {event.imageUrl && (
        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </AspectRatio>
        </div>
      )}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-[#6E59A5]">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#9b87f5]" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#9b87f5]" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#9b87f5]" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">{event.description}</p>

        <Button 
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] transition-colors duration-300"
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
