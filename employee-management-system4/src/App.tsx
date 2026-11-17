
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

import { useEmployees } from "./hooks/useEmployees";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeStats from "./components/EmployeeStats";

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

  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All");

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [actionError, setActionError] = useState("");

  // Unique departments
  const departments = useMemo(() => {
    return Array.from(
      new Set(employees.map((emp) => emp.department))
    );
  }, [employees]);

  // Department count
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

  // Search and filter
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

  // Total salary
  const totalSalary = useMemo(() => {
    return employees.reduce(
      (total, emp) => total + emp.salary,
      0
    );
  }, [employees]);

  // Add and update employee
  const handleSubmit = useCallback(
    async (employee: EmployeeInput) => {
      setActionError("");

      try {
        if (selectedEmployee) {
          await editEmployee(selectedEmployee.id, employee);
          setSelectedEmployee(null);
        } else {
          await createEmployee(employee);
        }
      } catch {
        setActionError("Unable to save employee");
        throw new Error("Unable to save employee");
      }
    },
    [selectedEmployee, editEmployee, createEmployee]
  );

  // Delete employee
  const handleDelete = useCallback(
    async (id: number) => {
      try {
        setActionError("");
        setDeletingId(id);
        await removeEmployee(id);
      } catch {
        setActionError("Unable to delete employee");
      } finally {
        setDeletingId(null);
      }
    },
    [removeEmployee]
  );

  // Cancel edit
  const handleCancel = useCallback(() => {
    setSelectedEmployee(null);
  }, []);

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

  // Loading
  if (loading) {
    return <h2>Loading employees...</h2>;
  }

  // API error
  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => fetchEmployees()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard">

      {/* Header */}
      <Header employeeCount={employees.length} />

      <div className="dashboard-layout">

        {/* Sidebar */}
        <Sidebar />

        <main className="main-content">

          <h1>Employee Dashboard</h1>

          {actionError && (
            <p className="error">{actionError}</p>
          )}

          {/* Dashboard Statistics */}
          <EmployeeStats
            totalEmployees={employees.length}
            totalDepartments={departments.length}
            showingEmployees={filteredEmployees.length}
            totalSalary={totalSalary}
          />

          {/* Department Count */}
          <div className="department-summary">

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
          </div>

          {/* Employee Form */}
          <EmployeeForm
            selectedEmployee={selectedEmployee}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />

          {/* Employee List */}
          <section id="employees">

            <h2>Employee List</h2>

            {/* Search */}
            <SearchBar
              search={search}
              onSearchChange={setSearch}
            />

            {/* Department Filter */}
            <DepartmentFilter
              departments={departments}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
            />

            <p>
              Showing {filteredEmployees.length} employees
            </p>

            {/* Employee Cards with Profiler */}
            <Profiler
              id="EmployeeList"
              onRender={handleProfile}
            >
              <EmployeeList
                employees={filteredEmployees}
                onEdit={setSelectedEmployee}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            </Profiler>

          </section>

        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>Employee Management System</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default App;
