
import { useState } from "react";

import type { Employee } from "./types/employee.types";
import { employees } from "./data/employees";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";
import EmployeeList from "./components/EmployeeList";

export default function App() {

  // Search state
  const [search, setSearch] = useState<string>("");

  // Department filter state
  const [department, setDepartment] = useState<string>("All");

  // Department list
  const departments: string[] = [
    "Engineering",
    "HR",
    "Finance",
    "Marketing"
  ];

  // Search and filter employees
  const filteredEmployees: Employee[] = employees.filter(
    (employee) => {

      const matchesSearch = employee.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    }
  );

  // Calculate department-wise employee count using reduce
  const departmentCounts = employees.reduce<Record<string, number>>(
    (counts, employee) => {

      counts[employee.department] =
        (counts[employee.department] || 0) + 1;

      return counts;
    },
    {}
  );

  // Total employees
  const totalEmployees: number = employees.length;

  // Total departments
  const totalDepartments: number = Object.keys(
    departmentCounts
  ).length;

  return (
    <div className="app">

      {/* Sidebar */}
      <Sidebar />

      <div className="main-content">

        {/* Header */}
        <Header employeeCount={totalEmployees} />

        <main className="dashboard" id="dashboard">

          {/* Welcome Section */}
          <section className="welcome">
            <h1>Dashboard Overview</h1>
            <p>
              View and manage your employee information.
            </p>
          </section>

          {/* Statistics */}
          <section className="stats">

            <article className="stat-card">
              <h3>Total Employees</h3>
              <h1>{totalEmployees}</h1>
            </article>

            <article className="stat-card">
              <h3>Total Departments</h3>
              <h1>{totalDepartments}</h1>
            </article>

            <article className="stat-card">
              <h3>Matching Employees</h3>
              <h1>{filteredEmployees.length}</h1>
            </article>

          </section>

          {/* Employee Information */}
          <section id="employees">

            <div className="section-heading">
              <h2>Employee Information</h2>
              <p>Search and filter employee details.</p>
            </div>

            {/* Search and Department Filter */}
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
            />

          </section>

          {/* Department Statistics */}
          <section
            className="department-section"
            id="departments"
          >

            <div className="section-heading">
              <h2>Department Overview</h2>
              <p>Employee count in each department.</p>
            </div>

            <div className="department-grid">

              {Object.entries(departmentCounts).map(
                ([dept, count]) => (

                  <article
                    className="department-card"
                    key={dept}
                  >
                    <h3>{dept}</h3>
                    <p>{count}</p>
                    <span>Employees</span>
                  </article>

                )
              )}

            </div>

          </section>

        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            © 2026 PeopleDesk. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}
