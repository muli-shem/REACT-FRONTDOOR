import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Lightbulb, 
  Megaphone,
  Calendar,
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/members', icon: Users, label: 'Members' },
    { path: '/finance', icon: DollarSign, label: 'Finance' },
    { path: '/blessed-mind', icon: Lightbulb, label: 'Blessed Mind' },
    { path: '/announcements', icon: Megaphone, label: 'Announcements' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-primary text-white z-50
          w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-primary-light">
          <div>
            <h1 className="text-2xl font-bold text-secondary">G-NET</h1>
            <p className="text-xs text-gray-300">Youth Network</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-secondary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${active 
                    ? 'bg-secondary text-primary font-semibold' 
                    : 'text-gray-200 hover:bg-primary-light hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-primary-light">
          <p className="text-xs text-gray-300 text-center">
            Empowering Minds, Empowering Generations
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;