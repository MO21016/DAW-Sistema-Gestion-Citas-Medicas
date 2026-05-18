import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  BriefcaseMedical,
  Users,
  CalendarDays
} from 'lucide-react';

const BottomNav = () => {
  const items = [
    { label: 'Dashboard',      path: '/dashboard',    icon: LayoutDashboard },
    { label: 'Especialidades', path: '/especialidades', icon: Stethoscope },
    { label: 'Médicos',        path: '/medicos',       icon: BriefcaseMedical },
    { label: 'Pacientes',      path: '/pacientes',     icon: Users },
    { label: 'Citas',          path: '/citas',         icon: CalendarDays },
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? 'bottom-nav-item active' : 'bottom-nav-item'
            }
          >
            <Icon size={22} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;