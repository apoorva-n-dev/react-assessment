
import { useMemo, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";

import { useEmployees } from "./hooks/useEmployees";

import type {
  Employee,
  EmployeeInput,
} from "./types/employee.types";

function App() {
  const {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
  } = useEmployees();

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  // Get unique departments
  const departments = useMemo(
    () => [...new Set(employees.map((emp) => emp.department))],
    [employees]
  );

  // Department employee counts
  const departmentCounts = useMemo(() => {
    return employees.reduce((counts, employee) => {
      counts[employee.department] =
        (counts[employee.department] || 0) + 1;

      return counts;
    }, {} as Record<string, number>);
  }, [employees]);

  // Search and department filter
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "" ||
        employee.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, selectedDepartment]);

  // Add or update employee
  const handleSubmit = async (data: EmployeeInput) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setActionError("");

    try {
      if (selectedEmployee) {
        await editEmployee(selectedEmployee.id, data);
        setSuccessMessage("Employee updated successfully!");
      } else {
        await createEmployee(data);
        setSuccessMessage("Employee added successfully!");
      }

      setSelectedEmployee(null);
    } catch (err: unknown) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to save employee"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete employee
  const handleDelete = async (id: number) => {
    if (deletingId !== null) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setSuccessMessage("");
    setActionError("");

    try {
      await removeEmployee(id);
      setSuccessMessage("Employee deleted successfully!");

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }
    } catch (err: unknown) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to delete employee"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard">

      <Header employeeCount={employees.length} />

      <div className="dashboard-layout">

        <Sidebar />

        <main className="main-content">

          {/* DASHBOARD SECTION */}
          <section id="dashboard" className="page-section">

            <h1>Employee Management Dashboard</h1>

            <div className="dashboard-stats">

              <div className="stat-card">
                <h3>Total Employees</h3>
                <h2>{employees.length}</h2>
              </div>

              <div className="stat-card">
                <h3>Total Departments</h3>
                <h2>{departments.length}</h2>
              </div>

              <div className="stat-card">
                <h3>Showing Employees</h3>
                <h2>{filteredEmployees.length}</h2>
              </div>

            </div>

          </section>

          {/* EMPLOYEE FORM */}
          <EmployeeForm
            selectedEmployee={selectedEmployee}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedEmployee(null)}
          />

          {/* SUCCESS MESSAGE */}
          {successMessage && (
            <p className="success">{successMessage}</p>
          )}

          {/* ACTION ERROR */}
          {actionError && (
            <p className="error">{actionError}</p>
          )}

          {/* EMPLOYEE LIST SECTION */}
          <section id="employees" className="page-section">

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

            {loading && <p>Loading employees...</p>}

            {error && (
              <div>
                <p className="error">{error}</p>

                <button onClick={() => void fetchEmployees()}>
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <EmployeeList
                employees={filteredEmployees}
                onEdit={setSelectedEmployee}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            )}

          </section>

          {/* DEPARTMENT OVERVIEW SECTION */}
          {!loading && !error && (
            <section
              id="departments"
              className="department-summary page-section"
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

                      <p>Total Employees</p>
                    </div>
                  )
                )}

              </div>

            </section>
          )}

        </main>

      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          © 2026 Employee Management System. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;
