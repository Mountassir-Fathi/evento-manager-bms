
import { Layout } from "@/components/layout/Layout";
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

        <div className="w-full max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="/lovable-uploads/427287eb-cad9-466b-879d-bdbf271112ea.png"
              alt="Événement de la faculté" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-3xl font-semibold mb-4">L'Excellence Académique en Action</h2>
                <p className="text-lg leading-relaxed">
                  Découvrez nos événements prestigieux qui incarnent l'excellence académique et l'innovation. 
                  Des conférences internationales aux séminaires spécialisés, chaque rencontre est une 
                  opportunité d'enrichissement intellectuel et de networking professionnel.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-primary">Conférences d'Excellence</h3>
              <p className="text-gray-600">
                Des échanges intellectuels de haut niveau réunissant experts internationaux et chercheurs 
                éminents pour des discussions enrichissantes sur les dernières avancées scientifiques.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-primary">Séminaires Spécialisés</h3>
              <p className="text-gray-600">
                Des sessions approfondies permettant l'exploration détaillée des domaines de recherche 
                émergents et l'échange d'expertise entre professionnels du secteur.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-primary">Ateliers d'Innovation</h3>
              <p className="text-gray-600">
                Des espaces de création et d'expérimentation où théorie et pratique se rencontrent pour 
                façonner les solutions de demain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
