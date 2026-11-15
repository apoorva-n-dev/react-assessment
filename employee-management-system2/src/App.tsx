
import { useState } from "react";

import type {
  Employee,
  EmployeeInput
} from "./types/employee.types";

import { employees as initialEmployees } from "./data/employees";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";

export default function App() {

  // Initial employee data
  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  // Selected employee for editing
  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  // Search state
  const [search, setSearch] = useState("");

  // Default department
  const [department, setDepartment] = useState("All");

  const departments = [
    "Engineering",
    "HR",
    "Finance",
    "Marketing"
  ];

  // Add or Update Employee
  const handleSaveEmployee = async (
    employeeData: EmployeeInput
  ): Promise<void> => {

    if (editingEmployee) {

      // Update existing employee
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === editingEmployee.id
            ? { ...employee, ...employeeData }
            : employee
        )
      );

      setEditingEmployee(null);

    } else {

      // Add new employee
      const newEmployee: Employee = {
        id: Date.now(),
        ...employeeData
      };

      setEmployees((prevEmployees) => [
        ...prevEmployees,
        newEmployee
      ]);
    }
  };

  // Edit Employee
  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  // Delete Employee
  const handleDeleteEmployee = (id: number) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );

    if (editingEmployee?.id === id) {
      setEditingEmployee(null);
    }
  };

  // Search and Department Filter
  const filteredEmployees = employees.filter((employee) => {

    const matchesSearch = employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      employee.department === department;

    return matchesSearch && matchesDepartment;
  });

  // Total Departments
  const totalDepartments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  return (
    <div className="app">

      <Sidebar />

      <div className="main-content">

        <Header employeeCount={employees.length} />

        <div className="dashboard">

          {/* Welcome */}
          <div className="welcome">
            <h1>Employee Dashboard</h1>
            <p>
              Manage your employees and department details.
            </p>
          </div>

          {/* Statistics */}
          <div className="stats">

            <div className="stat-card">
              <h3>Total Employees</h3>
              <h1>{employees.length}</h1>
            </div>

            <div className="stat-card">
              <h3>Total Departments</h3>
              <h1>{totalDepartments}</h1>
            </div>

            <div className="stat-card">
              <h3>Showing Employees</h3>
              <h1>{filteredEmployees.length}</h1>
            </div>

          </div>

          {/* Employee Form */}
          <div className="section-heading">
            <h2>Employee Management</h2>
            <p>Add, edit and manage employee details.</p>
          </div>

          <EmployeeForm
            key={editingEmployee?.id ?? "new"}
            selectedEmployee={editingEmployee}
            onSubmit={handleSaveEmployee}
            onCancel={() => setEditingEmployee(null)}
          />

          {/* Employee Directory */}
          <div className="section-heading">
            <h2>Employee Directory</h2>
            <p>View and manage all your employees.</p>
          </div>

          {/* Search and Filter */}
          <div className="toolbar">

            <SearchBar
              search={search}
              onSearchChange={setSearch}
            />

            <DepartmentFilter
              departments={departments}
              selectedDepartment={department}
              onDepartmentChange={setDepartment}
            />

          </div>

          {/* Employee List */}
          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />

          {/* Department Overview */}
          <div className="department-section">
            <h2>Department Overview</h2>

            <div className="department-grid">

              {departments.map((dept) => {

                const count = employees.filter(
                  (employee) => employee.department === dept
                ).length;

                return (
                  <div
                    className="department-card"
                    key={dept}
                  >
                    <h3>{dept}</h3>
                    <p>{count} Employees</p>
                  </div>
                );
              })}

            </div>
          </div>

        </div>

        <footer>
          © 2026 PeopleDesk. All rights reserved.
        </footer>

      </div>
    </div>
  );
}
