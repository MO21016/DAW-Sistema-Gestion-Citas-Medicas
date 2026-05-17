import { useEffect, useState } from 'react';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardStats from '../components/dashboard/DashboardStats';
import CitasPorEstado from '../components/dashboard/CitasPorEstado';
import RecentAppointments from '../components/dashboard/RecentAppointments';

import { dashboardService } from '../services/dashboardService';

const DashboardPage = () => {

  const [stats, setStats] = useState({
    medicos: 0,
    pacientes: 0,
    especialidades: 0,
    citasHoy: 0,
  });

  const [citasEstado, setCitasEstado] = useState({
    PENDIENTE: 0,
    CONFIRMADA: 0,
    COMPLETADA: 0,
    CANCELADA: 0,
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {
      try {

        const [
          medicos,
          pacientes,
          especialidades,
          todasCitas,
          pendientes,
          confirmadas,
          completadas,
          canceladas,
        ] = await Promise.all([
          dashboardService.getMedicos(),
          dashboardService.getPacientes(),
          dashboardService.getEspecialidades(),
          dashboardService.getCitas(),
          dashboardService.getCitasPorEstado('PENDIENTE'),
          dashboardService.getCitasPorEstado('CONFIRMADA'),
          dashboardService.getCitasPorEstado('COMPLETADA'),
          dashboardService.getCitasPorEstado('CANCELADA'),
        ]);

        const today = new Date().toISOString().split('T')[0];

        const citasHoy = todasCitas.filter(
          (cita) => cita.fechaCita === today
        );

        setStats({
          medicos: medicos.length,
          pacientes: pacientes.length,
          especialidades: especialidades.length,
          citasHoy: citasHoy.length,
        });

        setCitasEstado({
          PENDIENTE: pendientes.length,
          CONFIRMADA: confirmadas.length,
          COMPLETADA: completadas.length,
          CANCELADA: canceladas.length,
        });

        setAppointments(todasCitas);

      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el dashboard. Verifica que la API esté activa.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();

  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />

      <main className="dashboard-page">
        <DashboardStats stats={stats} />
        <CitasPorEstado citasEstado={citasEstado} />
        <RecentAppointments appointments={appointments} />
      </main>
    </>
  );
};

export default DashboardPage;