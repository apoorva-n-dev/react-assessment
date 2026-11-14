import { useCallback, useEffect, useState } from "react";

import type {
  Employee,
  EmployeeInput
} from "../types/employee.types";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/employeeService";

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // GET employees
  const fetchEmployees = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees(signal);

      setEmployees(data);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // API call when component mounts
  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchEmployees]);

  // ADD employee
  const createEmployee = async (employee: EmployeeInput) => {
    const newEmployee = await addEmployee(employee);

    setEmployees((previous) => [
      ...previous,
      newEmployee
    ]);
  };

 // UPDATE employee
const editEmployee = async (
  id: number,
  employee: EmployeeInput
) => {
  let updatedEmployee: Employee;

  if (id <= 10) {
    // Existing JSONPlaceholder employee
    updatedEmployee = await updateEmployee(id, employee);
  } else {
    // Newly added employee - update local state
    updatedEmployee = {
      id,
      ...employee,
    };
  }

  setEmployees((previous) =>
    previous.map((item) =>
      item.id === id ? updatedEmployee : item
    )
  );
};

  // DELETE employee
  const removeEmployee = async (id: number) => {
    await deleteEmployee(id);

    setEmployees((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee
  };
};