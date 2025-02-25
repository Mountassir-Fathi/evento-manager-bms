
import { Layout } from "@/components/layout/Layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-12 fade-in">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="relative">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Faculté des Sciences Ben M'Sik
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Bienvenue sur le portail de gestion des événements
              <span className="block mt-2 font-medium text-blue-700">Université Hassan II de Casablanca</span>
            </p>
          </div>

          <button 
            onClick={() => navigate('/events')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg leading-none flex items-center mx-auto hover:shadow-lg transition duration-300"
          >
            <Calendar className="mr-2 h-5 w-5" />
            <span className="pr-6">Explorer les événements</span>
            <span className="pl-6 border-l border-blue-500">→</span>
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-8">Nos Derniers Événements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="/lovable-uploads/427287eb-cad9-466b-879d-bdbf271112ea.png"
                  alt="Conférence" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Conférence Internationale sur les Technologies</h3>
                <p className="text-gray-600">Discussions et présentations sur les dernières avancées technologiques</p>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="/lovable-uploads/96262cf1-f430-419f-a8b6-0964d556b1c0.png"
                  alt="Workshop" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Workshop sur l'Innovation</h3>
                <p className="text-gray-600">Séances pratiques et collaboratives sur l'innovation technologique</p>
              </div>
            </div>

            <div className="group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <AspectRatio ratio={16/9}>
                <img 
                  src="/lovable-uploads/d72bb1fa-13e2-4d2c-b497-04038b38b7a8.png"
                  alt="Séminaire" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </AspectRatio>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg mb-2">Séminaire de Recherche</h3>
                <p className="text-gray-600">Présentation des travaux de recherche de nos étudiants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
