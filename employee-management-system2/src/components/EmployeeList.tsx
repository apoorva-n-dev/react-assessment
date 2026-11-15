import type { Employee } from "../types/employee.types";
import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export default function EmployeeList({
  employees,
  onEdit,
  onDelete
}: EmployeeListProps) {

  if (employees.length === 0) {
    return (
      <div className="empty">
        <h3>No employees found</h3>
        <p>Add an employee to see the employee list.</p>
      </div>
    );
  }

  return (
    <div className="employee-grid">

      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}