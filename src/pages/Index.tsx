
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-12 fade-in">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Faculté des Sciences Ben M'Sik
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Bienvenue sur le portail de gestion des événements
            <span className="block mt-2 font-medium text-blue-700">Université Hassan II de Casablanca</span>
          </p>
          <div className="mt-8 inline-flex">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg leading-none flex items-center hover:shadow-lg transition duration-300">
              <span className="pr-6 text-white">Explorer les événements</span>
              <span className="pl-6 border-l border-blue-500">→</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
