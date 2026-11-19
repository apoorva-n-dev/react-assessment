import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useEmployeeContext } from "../../hooks/useEmployeeContext";
import { useSettings } from "../../hooks/useSettings";

function AppLayout() {
  const { employeeCount } = useEmployeeContext();
  const { theme } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = location.pathname.split("/")[1] || "dashboard";

  const handleNavigate = (section: string) => {
    navigate(`/${section}`);
  };

  return (
    <div className={`dashboard theme-${theme}`}>
      <Header employeeCount={employeeCount} />

      <div className="dashboard-layout">
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main className="main-content">
          <Outlet />
        </main>
      </div>

      <footer className="app-footer">
        <p>Employee Management System</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default AppLayout;