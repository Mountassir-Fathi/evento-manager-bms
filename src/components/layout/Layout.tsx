
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
