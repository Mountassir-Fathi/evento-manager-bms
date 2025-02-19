
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="fixed inset-0 bg-[url('/lovable-uploads/b4359f62-3c36-4aa3-a9d4-0069ad7ef641.png')] opacity-5 bg-center bg-no-repeat pointer-events-none" />
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
