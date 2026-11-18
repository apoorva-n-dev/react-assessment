
import { memo } from "react";
import type { Employee } from "../types/employee.types";
import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
  viewMode: "card" | "table";
}

function EmployeeList({
  employees,
  onEdit,
  onDelete,
  deletingId,
  viewMode,
}: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Employees Found</h3>
        <p>Try changing your search or department filter.</p>
      </div>
    );
  }

  // CARD VIEW
  if (viewMode === "card") {
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

  // TABLE VIEW
  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td className="employee-name">{employee.name}</td>
              <td>{employee.email}</td>
              <td>
                <span className="department-badge">
                  {employee.department}
                </span>
              </td>
              <td>{employee.designation}</td>
              <td>
                ₹{Number(employee.salary).toLocaleString("en-IN")}
              </td>
              <td>
                <div className="table-actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(employee.id)}
                    disabled={deletingId === employee.id}
                  >
                    {deletingId === employee.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(EmployeeList);
