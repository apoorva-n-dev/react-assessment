
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
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "HR Executive",
    "Manager",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Employee ${index + 1}`,
    email: `employee${index + 1}@company.com`,
    department: departments[index % departments.length],
    designation: designations[index % designations.length],
    salary: 25000 + (index % 10) * 5000,
  }));
};
