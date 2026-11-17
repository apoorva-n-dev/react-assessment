import { memo } from "react";
import type { Employee } from "../types/employee.types";

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  deleting: boolean;
}

function EmployeeCard({
  employee,
  onEdit,
  onDelete,
  deleting
}: EmployeeCardProps) {
  return (
    <div className="employee-card">

      <h3>{employee.name}</h3>

      <p>{employee.designation}</p>

      <p className="email">{employee.email}</p>

      <p>Department: {employee.department}</p>

      <p>Salary: ₹{employee.salary}</p>

      <div className="card-footer">
        <button onClick={() => onEdit(employee)}>
          Edit
        </button>

        <button
        onClick={() => onDelete(employee.id)}
        disabled={deleting}>
        {deleting ? "Deleting..." : "Delete"}
      </button>
      </div>

    </div>
  );
}

export default memo(EmployeeCard);