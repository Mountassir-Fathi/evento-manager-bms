
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
              src="/lovable-uploads/bf14ca15-ca82-4c35-be83-b9dd7cdff3ab.png"
              alt="Faculté des Sciences Ben M'Sik" 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
