
import { memo } from "react";

import type { Employee } from "../types/employee.types";

import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

function EmployeeList({
  employees,
  onEdit,
  onDelete,
  deletingId,
}: EmployeeListProps) {

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Employees Found</h3>
        <p>Try changing your search or department filter.</p>
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
          deleting={deletingId === employee.id}
        />
      ))}
    </div>
  );
}

export default memo(EmployeeList);
