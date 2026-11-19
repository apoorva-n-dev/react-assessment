import { useMemo } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import EmployeeStats from "../components/EmployeeStats";

function Dashboard() {
  const { employees, employeeCount } = useEmployeeContext();

  const departments = useMemo(
    () => [...new Set(employees.map((emp) => emp.department))],
    [employees]
  );

  const departmentCounts = useMemo(
    () =>
      employees.reduce<Record<string, number>>((counts, emp) => {
        counts[emp.department] = (counts[emp.department] || 0) + 1;
        return counts;
      }, {}),
    [employees]
  );

  const totalSalary = useMemo(
    () => employees.reduce((total, emp) => total + emp.salary, 0),
    [employees]
  );

  return (
    <section>
      <h1>Employee Dashboard</h1>

      <EmployeeStats
        totalEmployees={employeeCount}
        totalDepartments={departments.length}
        showingEmployees={employees.length}
        totalSalary={totalSalary}
      />

      <h2>Department Overview</h2>
      <div className="department-summary-grid">
        {Object.entries(departmentCounts).map(([department, count]) => (
          <div className="department-summary-card" key={department}>
            <h3>{department}</h3>
            <h2>{count}</h2>
            <p>Employees</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;