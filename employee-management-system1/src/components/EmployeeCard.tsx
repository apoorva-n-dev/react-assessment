
import type { Employee } from "../types/employee.types";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({
  employee
}: EmployeeCardProps) {
  return (
    <article className="employee-card">

      <h3>{employee.name}</h3>

      <p className="designation">
        {employee.designation}
      </p>

      <p className="email">
        {employee.email}
      </p>

      <p className="department-label">
        Department: {employee.department}
      </p>
    </article>
  );
}
