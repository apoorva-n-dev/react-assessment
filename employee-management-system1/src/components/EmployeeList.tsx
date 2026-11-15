
import type { Employee } from "../types/employee.types";
import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
}

export default function EmployeeList({
  employees
}: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="empty">
        <h3>No employees found</h3>
        <p>Try another name or department.</p>
      </div>
    );
  }

  return (
    <section className="employee-grid">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
        />
      ))}
    </section>
  );
}
