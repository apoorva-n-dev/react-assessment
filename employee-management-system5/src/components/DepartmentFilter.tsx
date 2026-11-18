import {memo} from "react";

interface DepartmentFilterProps {
  departments: string[];
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
}

function DepartmentFilter({
  departments,
  selectedDepartment,
  onDepartmentChange
}: DepartmentFilterProps) {
  return (
    <select
      value={selectedDepartment}
      onChange={(e) => onDepartmentChange(e.target.value)}
    >
      <option value="">All Departments</option>

      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
}

export default memo(DepartmentFilter);