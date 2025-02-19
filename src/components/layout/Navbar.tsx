
import { Calendar, Home, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/18af67c0-5636-4076-98b9-34eb839fe32a.png" alt="FSBM Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8 items-center">
            <NavLink to="/" icon={<Home className="h-4 w-4" />}>
              Accueil
            </NavLink>
            <NavLink to="/events" icon={<Calendar className="h-4 w-4" />}>
              Événements
            </NavLink>
            <NavLink to="/admin/events" icon={<Settings className="h-4 w-4" />}>
              Administration Événements
            </NavLink>
            <NavLink to="/admin/students" icon={<Users className="h-4 w-4" />}>
              Administration Étudiants
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary transition-colors"
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}
