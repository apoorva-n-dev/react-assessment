import { memo } from "react";

interface EmployeeStatsProps {
  totalEmployees: number;
  totalDepartments: number;
  showingEmployees: number;
  totalSalary: number;
}

function EmployeeStats({
  totalEmployees,
  totalDepartments,
  showingEmployees,
  totalSalary,
}: EmployeeStatsProps) {
  return (
    <div className="dashboard-stats">

      <div className="stat-card">
        <h3>Total Employees</h3>
        <h2>{totalEmployees}</h2>
      </div>

      <div className="stat-card">
        <h3>Total Departments</h3>
        <h2>{totalDepartments}</h2>
      </div>

      <div className="stat-card">
        <h3>Showing Employees</h3>
        <h2>{showingEmployees}</h2>
      </div>

      <div className="stat-card">
        <h3>Total Salary</h3>
        <h2>
          ₹{totalSalary.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>
  );
}

export default memo(EmployeeStats);