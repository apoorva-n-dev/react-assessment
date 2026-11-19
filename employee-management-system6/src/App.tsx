
import {
  Profiler,
  useCallback,
  useMemo,
  useState,
} from "react";

import type {
  Employee,
  EmployeeInput,
} from "./types/employee.types";

import { useEmployeeContext } from "./hooks/useEmployeeContext";
import { useSettings } from "./hooks/useSettings";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeStats from "./components/EmployeeStats";

function App() {
  // Employee Context
  const {
    employees,
    selectedEmployee,
    loading,
    error,
    employeeCount,
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
    selectEmployee,
  } = useEmployeeContext();

  // Settings Context
  const {
    theme,
    setTheme,
    selectedDepartment,
    setSelectedDepartment,
    viewMode,
    setViewMode,
  } = useSettings();

  // Local State
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  // Sidebar Navigation
  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section);

    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  // Get Departments
  const departments = useMemo(() => {
    return Array.from(
      new Set(employees.map((emp) => emp.department))
    );
  }, [employees]);

  // Department Employee Count
  const departmentCounts = useMemo(() => {
    return employees.reduce<Record<string, number>>(
      (counts, emp) => {
        counts[emp.department] =
          (counts[emp.department] || 0) + 1;

        return counts;
      },
      {}
    );
  }, [employees]);

  // Search and Department Filter
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "All" ||
        emp.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, selectedDepartment]);

  // Total Salary
  const totalSalary = useMemo(() => {
    return employees.reduce(
      (total, emp) => total + emp.salary,
      0
    );
  }, [employees]);

  // Add and Update Employee
  const handleSubmit = useCallback(
    async (employee: EmployeeInput) => {
      setActionError("");

      try {
        if (selectedEmployee) {
          await editEmployee(selectedEmployee.id, employee);

          selectEmployee(null);

          window.alert("Employee updated successfully!");
        } else {
          await createEmployee(employee);

          window.alert("Employee added successfully!");
        }
      } catch (err) {
        console.error("Save employee error:", err);

        setActionError("Unable to save employee");

        window.alert("Error: Unable to save employee");

        throw err;
      }
    },
    [
      selectedEmployee,
      editEmployee,
      createEmployee,
      selectEmployee,
    ]
  );

  // Delete Employee with Confirmation Popup
  const handleDelete = useCallback(
    async (id: number) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
      );

      if (!confirmDelete) {
        return;
      }

      try {
        setActionError("");
        setDeletingId(id);

        await removeEmployee(id);

        window.alert("Employee deleted successfully!");
      } catch (err) {
        console.error("Delete employee error:", err);

        setActionError("Unable to delete employee");

        window.alert("Error: Unable to delete employee");
      } finally {
        setDeletingId(null);
      }
    },
    [removeEmployee]
  );

  // Edit Employee
  const handleEdit = useCallback(
    (employee: Employee) => {
      selectEmployee(employee);

      document.getElementById("employee-form")?.scrollIntoView({
        behavior: "smooth",
      });
    },
    [selectEmployee]
  );

  // Cancel Form
  const handleCancel = useCallback(() => {
    selectEmployee(null);
  }, [selectEmployee]);

  // React Profiler
  const handleProfile = useCallback(
    (
      id: string,
      phase: "mount" | "update" | "nested-update",
      actualDuration: number
    ) => {
      console.log("Profiler:", {
        id,
        phase,
        actualDuration,
      });
    },
    []
  );

  // Loading State
  if (loading) {
    return (
      <div className="loading">
        <h2>Loading employees...</h2>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>

        <button type="button" onClick={() => fetchEmployees()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`dashboard theme-${theme}`}>
      {/* HEADER */}
      <Header employeeCount={employeeCount} />

      <div className="dashboard-layout">
        {/* SIDEBAR */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        {/* MAIN CONTENT */}
        <main className="main-content">

          {/* DASHBOARD */}
          <section id="dashboard">
            <h1>Employee Dashboard</h1>

            {actionError && (
              <p className="error">{actionError}</p>
            )}

            <EmployeeStats
              totalEmployees={employees.length}
              totalDepartments={departments.length}
              showingEmployees={filteredEmployees.length}
              totalSalary={totalSalary}
            />
          </section>

          {/* SETTINGS */}
          <section id="settings" className="settings-panel">
            <h2>Application Settings</h2>

            <div className="setting-item">
              <label>Theme:</label>

              <button
                type="button"
                onClick={() =>
                  setTheme(
                    theme === "light" ? "dark" : "light"
                  )
                }
              >
                {theme === "light"
                  ? "Switch to Dark"
                  : "Switch to Light"}
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

          {/* DEPARTMENT OVERVIEW */}
          <section
            id="departments"
            className="department-summary"
          >
            <h2>Department Overview</h2>

            <div className="department-summary-grid">
              {Object.entries(departmentCounts).map(
                ([department, count]) => (
                  <div
                    className="department-summary-card"
                    key={department}
                  >
                    <h3>{department}</h3>
                    <h2>{count}</h2>
                    <p>Employees</p>
                  </div>
                )
              )}
            </div>
          </section>

          {/* EMPLOYEE FORM */}
          <section id="employee-form">
            <EmployeeForm
              selectedEmployee={selectedEmployee}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </section>

          {/* EMPLOYEE LIST */}
          <section id="employees">
            <h2>Employee List</h2>

            <SearchBar
              search={search}
              onSearchChange={setSearch}
            />

            <DepartmentFilter
              departments={departments}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
            />

            <p>
              Showing {filteredEmployees.length} employees
            </p>

            <Profiler
              id="EmployeeList"
              onRender={handleProfile}
            >
              <EmployeeList
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deletingId={deletingId}
                viewMode={viewMode}
              />
            </Profiler>
          </section>

        </main>
      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>Employee Management System</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
