
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImagePlus } from "lucide-react";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreate: (event: any) => void;
}

export function CreateEventDialog({
  open,
  onOpenChange,
  onEventCreate
}: CreateEventDialogProps) {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newEvent = {
      id: Date.now(),
      title: formData.get('title'),
      date: formData.get('date'),
      startTime: formData.get('startTime'),
      endTime: formData.get('endTime'),
      location: formData.get('location'),
      description: formData.get('description'),
      imageUrl: image
    };

    onEventCreate(newEvent);
    onOpenChange(false);
    toast({
      title: "Événement créé",
      description: "L'événement a été créé avec succès",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" name="title" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Heure de début</Label>
              <Input id="startTime" name="startTime" type="time" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure de fin</Label>
              <Input id="endTime" name="endTime" type="time" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input id="location" name="location" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image de l'événement</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
              {image ? (
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={image}
                    alt="Aperçu"
                    className="rounded-lg object-cover w-full h-full"
                  />
                </AspectRatio>
              ) : (
                <label htmlFor="image" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Cliquez pour ajouter une image</span>
                </label>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Créer l'événement
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
