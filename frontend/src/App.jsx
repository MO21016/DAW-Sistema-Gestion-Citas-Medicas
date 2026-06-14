import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import EspecialidadesPage from './pages/EspecialidadesPage';
import MedicosPage from './pages/MedicosPage';
import PacientesPage from './pages/PacientesPage';
import CitasPage from './pages/CitasPage';
import './styles/style.css';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/especialidades" element={<EspecialidadesPage />} />
          <Route path="/medicos" element={<MedicosPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/citas" element={<CitasPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;