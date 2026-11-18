import type { Employee } from "../types/employee.types";

export const generateEmployees = (count: number): Employee[] => {
  const departments = [
    "IT",
    "HR",
    "Finance",
    "Marketing",
    "Sales",
  ];

  const designations = [
    "Developer",
    "Manager",
    "Tester",
    "Designer",
    "Team Lead",
  ];

  return Array.from({ length: count }, (_, index) => {
    const id = 1001 + index;

    return {
      id,
      name: `Employee ${id}`,
      email: `employee${id}@company.com`,
      department: departments[index % departments.length],
      designation: designations[index % designations.length],
      salary: 20000 + (index % 10) * 5000,
    };
  });
};