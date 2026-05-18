import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-container">
        {children}
      </div>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;