
interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Sidebar = ({
  activeSection,
  onNavigate,
}: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "employees", label: "Employees", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "departments", label: "Departments", icon: "🏢" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>EMS</h2>
        <p>Employee Management</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-link ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Employee Portal</p>
        <small>Version 1.0</small>
      </div>
    </aside>
  );
};

export default Sidebar;
