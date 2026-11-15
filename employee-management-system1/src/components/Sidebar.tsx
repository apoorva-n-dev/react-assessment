
const menuItems = [
  { name: "Dashboard", href: "#dashboard" },
  { name: "Employees", href: "#employees" },
  { name: "Departments", href: "#departments" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">PeopleDesk</h2>

      <p className="menu-title">MAIN MENU</p>

      <nav>
        {menuItems.map((item, index) => (
          <a
            href={item.href}
            key={item.name}
            className={index === 0 ? "menu active" : "menu"}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
}
