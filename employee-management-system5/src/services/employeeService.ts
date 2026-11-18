
import type { Employee, EmployeeInput, ApiUser } from "../types/employee.types";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// GET
export const getEmployees = async (signal?:AbortSignal): Promise<Employee[]> => {
    const response = await fetch(API_URL, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

   const users: ApiUser[] = await response.json();

  // converting API response to our format 
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    department: user.company.name,
    designation: "Employee",
    salary: 0
  }));

};


// POST
export const addEmployee = async (
  employee: EmployeeInput
): Promise<Employee> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  const data = await response.json();

  return {
    ...employee,
    id: data.id ?? Date.now()
  };
  
};

// PUT - UPDATE EMPLOYEE

export const updateEmployee = async (
  id: number,
  employee: EmployeeInput
): Promise<Employee> => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    const errorMessage = await response.text();

    throw new Error(
      `Failed to update employee. Status: ${response.status}. ${errorMessage}`
    );
  }

  const result: Employee = await response.json();

  return {
    ...result,
    ...employee,
    id,
  };
};

// DELETE
export const deleteEmployee = async (
  id: number
): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
};

