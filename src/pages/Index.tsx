
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-8 fade-in">
        <img
          src="/lovable-uploads/b4359f62-3c36-4aa3-a9d4-0069ad7ef641.png"
          alt="Université Hassan II"
          className="h-32 object-contain"
        />
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Faculté des Sciences Ben M'Sik
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Bienvenue sur le portail de gestion des événements de la Faculté des Sciences Ben M'Sik,
            Université Hassan II de Casablanca
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
