import type { Employee } from "../types/employee.types";
import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  deletingId:number|null;
}

export default function EmployeeList({
  employees,
  onEdit,
  onDelete,
  deletingId
}: EmployeeListProps) {

  if (employees.length === 0) {
    return <p>No employees found.</p>
  }

  return (
  <div className="employee-grid">
    {employees.map((employee) => (
      <EmployeeCard
        key={employee.id}
        employee={employee}
        onEdit={onEdit}
        onDelete={onDelete}
        deleting={deletingId === employee.id}
      />
    ))}
  </div>
  );
}