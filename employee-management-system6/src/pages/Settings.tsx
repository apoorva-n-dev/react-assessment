import { useSettings } from "../hooks/useSettings";

function Settings() {
  const { theme, setTheme, viewMode, setViewMode } = useSettings();

  return (
    <section className="settings-panel">
      <h2>Application Settings</h2>

      <div className="setting-item">
        <label>Theme:</label>
        <button
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
        <span>Current theme: {theme}</span>
      </div>

      <div className="setting-item">
        <label>Employee View:</label>
        <button
          type="button"
          onClick={() => setViewMode("card")}
          disabled={viewMode === "card"}
        >
          Card View
        </button>
        <button
          type="button"
          onClick={() => setViewMode("table")}
          disabled={viewMode === "table"}
        >
          Table View
        </button>
        <span>Current view: {viewMode}</span>
      </div>
    </section>
  );
}

export default Settings;