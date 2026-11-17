
import { useCallback, useEffect, useState } from "react";

import type {
  Employee,
  EmployeeInput,
} from "../types/employee.types";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

import { generateEmployees } from "../data/performanceEmployees";

const MAX_EMPLOYEES = 1000;

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch employees
  const fetchEmployees = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        setError("");

        const data = await getEmployees(signal);

        if (signal?.aborted) return;

        // Generate 1000 test employees
        const testEmployees = generateEmployees(1000);

        // Combine API and test employees
        const allEmployees = [...data, ...testEmployees];

        // Keep exactly 1000 employees and assign IDs/names from 1 to 1000
        const limitedEmployees = allEmployees
          .slice(0, MAX_EMPLOYEES)
          .map((employee, index) => ({
            ...employee,
            id: index + 1,
            name: `Employee ${index + 1}`,
          }));

        setEmployees(limitedEmployees);

      } catch (err) {
        if (signal?.aborted) return;

        setError("Failed to load employees");
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  // Add employee
  const createEmployee = useCallback(
    async (employee: EmployeeInput) => {
      await addEmployee(employee);

      setEmployees((previous) => {
        if (previous.length >= MAX_EMPLOYEES) {
          return previous;
        }

        const nextId =
          Math.max(1000, ...previous.map((item) => item.id)) + 1;

        return [
          ...previous,
          {
            id: nextId,
            ...employee,
          },
        ];
      });
    },
    []
  );

  // Update employee
  const editEmployee = useCallback(
    async (id: number, employee: EmployeeInput) => {
      if (id <= 10) {
        await updateEmployee(id, employee);
      }

      setEmployees((previous) =>
        previous.map((item) =>
          item.id === id ? { id, ...employee } : item
        )
      );
    },
    []
  );

  // Delete employee
  const removeEmployee = useCallback(async (id: number) => {
    if (id <= 10) {
      await deleteEmployee(id);
    }

    setEmployees((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }, []);

  // Initial fetch
  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    editEmployee,
    removeEmployee,
  };
}
