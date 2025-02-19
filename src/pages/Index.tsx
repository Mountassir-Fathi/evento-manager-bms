
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-12 fade-in">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img
            src="/lovable-uploads/b4359f62-3c36-4aa3-a9d4-0069ad7ef641.png"
            alt="Université Hassan II"
            className="relative h-40 object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            Faculté des Sciences Ben M'Sik
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bienvenue sur le portail de gestion des événements de la Faculté des Sciences Ben M'Sik,
            <span className="block mt-2 font-medium text-primary">Université Hassan II de Casablanca</span>
          </p>
          <div className="relative mt-8 inline-flex group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
            <button className="relative px-8 py-4 bg-white rounded-lg leading-none flex items-center divide-x divide-gray-600">
              <span className="pr-6 text-primary">Explorer les événements</span>
              <span className="pl-6 text-blue-600 group-hover:text-primary transition duration-200">→</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
