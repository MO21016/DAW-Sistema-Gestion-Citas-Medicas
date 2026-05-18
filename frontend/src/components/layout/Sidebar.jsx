// src/components/layout/Sidebar.jsx

import { NavLink } from 'react-router-dom';

import logo from "../../assets/logo.png";

import {
  LayoutDashboard,
  Stethoscope,
  Users,
  UserRound,
  CalendarDays,
  BriefcaseMedical
} from 'lucide-react';

const Sidebar = () => {

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      label: 'Especialidades',
      path: '/especialidades',
      icon: Stethoscope
    },
    {
      label: 'Médicos',
      path: '/medicos',
      icon: BriefcaseMedical
    },
    {
      label: 'Pacientes',
      path: '/pacientes',
      icon: Users
    },
    {
      label: 'Citas',
      path: '/citas',
      icon: CalendarDays
    },
    {
      label: 'Asignaciones',
      path: '/medico-especialidades',
      icon: UserRound
    }
  ];

  return (

    <aside className="sidebar">

      {/* LOGO + REDIRECCIÓN */}
      <div className="sidebar-header">

        <NavLink
          to="/dashboard"
          className="logo-button"
        >

          <div className="logo-container">

            <img
              src={logo}
              alt="Healify Logo"
              className="logo-image"
            />

            <div>
              <h1>Healify</h1>
              <p>Medical System</p>
            </div>

          </div>

        </NavLink>

      </div>

      {/* MENÚ */}
      <nav className="sidebar-nav">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >

              <Icon size={20} />

              <span>{item.label}</span>

            </NavLink>

          );

        })}

      </nav>

    </aside>

  );

};

export default Sidebar;