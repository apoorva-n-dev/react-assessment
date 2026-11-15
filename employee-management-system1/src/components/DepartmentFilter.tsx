
interface DepartmentFilterProps {
  departments: string[];
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
}

export default function DepartmentFilter({
  departments,
  selectedDepartment,
  onDepartmentChange
}: DepartmentFilterProps) {
  return (
    <select
      className="department-select"
      value={selectedDepartment}
      onChange={(e) => onDepartmentChange(e.target.value)}
    >
      <option value="All">All Departments</option>

      {departments.map((department) => (
        <option key={department} value={department}>
          {department}
        </option>
      ))}
    </select>
  );
}
