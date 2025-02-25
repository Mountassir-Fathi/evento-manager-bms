
import { Layout } from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-12 fade-in">
        <div className="relative w-full max-w-6xl mx-auto">
          <img 
            src="/lovable-uploads/b09134da-05a0-4561-9527-df92dcb5d4b0.png"
            alt="Université Hassan II de Casablanca"
            className="w-full rounded-xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Faculté des Sciences Ben M'Sik
            </h1>
            <p className="text-xl leading-relaxed max-w-3xl">
              Explorez l'excellence académique à travers notre plateforme dédiée aux événements prestigieux
              <span className="block mt-2 font-medium">Université Hassan II de Casablanca</span>
            </p>
          </div>
        </div>

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/events')}
            className="px-8 py-4 bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-lg leading-none flex items-center mx-auto shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
          >
            <Calendar className="mr-2 h-5 w-5" />
            <span className="pr-6">Découvrir nos événements</span>
            <span className="pl-6 border-l border-[#D6BCFA]">→</span>
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8 text-[#403E43]">
            Notre Excellence en Action
          </h2>
          <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Rejoignez-nous pour des événements qui façonnent l'avenir de l'éducation et de la recherche scientifique
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
