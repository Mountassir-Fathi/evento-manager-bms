
import { Calendar, Home, Settings, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-primary/80 to-blue-900/80 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/18af67c0-5636-4076-98b9-34eb839fe32a.png" 
                alt="FSBM Logo" 
                className="h-10 w-auto hover:scale-105 transition-transform" 
              />
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-1 items-center">
            <NavLink to="/" icon={<Home className="h-4 w-4" />} active={location.pathname === "/"}>
              Accueil
            </NavLink>
            <NavLink to="/events" icon={<Calendar className="h-4 w-4" />} active={location.pathname === "/events"}>
              Événements
            </NavLink>
            <NavLink to="/admin/events" icon={<Settings className="h-4 w-4" />} active={location.pathname.startsWith("/admin/events")}>
              Administration Événements
            </NavLink>
            <NavLink to="/admin/students" icon={<Users className="h-4 w-4" />} active={location.pathname.startsWith("/admin/students")}>
              Administration Étudiants
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ 
  to, 
  children, 
  icon, 
  active 
}: { 
  to: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`
        relative inline-flex items-center px-4 py-2 text-sm font-medium
        transition-all duration-200 rounded-lg
        ${active 
          ? "text-white bg-white/10" 
          : "text-white/80 hover:text-white hover:bg-white/5"
        }
      `}
    >
      <span className={`mr-2 ${active ? "scale-110" : ""} transition-transform`}>{icon}</span>
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
      )}
    </Link>
  );
}
