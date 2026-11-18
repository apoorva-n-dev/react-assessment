import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import type { ReactNode } from "react";

import type {
  Employee,
  EmployeeInput,
} from "../types/employee.types";

import {
  employeeReducer,
  initialEmployeeState,
} from "../reducers/employeeReducer";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

import { generateEmployees } from "../data/performanceEmployees";

interface EmployeeContextType {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string;
  employeeCount: number;

  fetchEmployees: (signal?: AbortSignal) => Promise<void>;
  createEmployee: (employee: EmployeeInput) => Promise<void>;
  editEmployee: (id: number, employee: EmployeeInput) => Promise<void>;
  removeEmployee: (id: number) => Promise<void>;
  selectEmployee: (employee: Employee | null) => void;
}

export const EmployeeContext =
  createContext<EmployeeContextType | undefined>(undefined);

interface EmployeeProviderProps {
  children: ReactNode;
}

export function EmployeeProvider({
  children,
}: EmployeeProviderProps) {
  const [state, dispatch] = useReducer(
    employeeReducer,
    initialEmployeeState
  );

  // GET employees
  const fetchEmployees = useCallback(
    async (signal?: AbortSignal) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: "" });

        const data = await getEmployees(signal);

        if (signal?.aborted) return;

        const testEmployees = generateEmployees(1000);

        dispatch({
          type: "SET_EMPLOYEES",
          payload: [...data, ...testEmployees],
        });
      } catch {
        if (!signal?.aborted) {
          dispatch({
            type: "SET_ERROR",
            payload: "Failed to load employees",
          });
        }
      } finally {
        if (!signal?.aborted) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    },
    []
  );

  // ADD employee
  const createEmployee = useCallback(
    async (employee: EmployeeInput) => {
      await addEmployee(employee);

      const nextId =
        Math.max(
          2000,
          ...state.employees.map((item) => item.id)
        ) + 1;

      dispatch({
        type: "ADD_EMPLOYEE",
        payload: {
          id: nextId,
          ...employee,
        },
      });
    },
    [state.employees]
  );

  // UPDATE employee
  const editEmployee = useCallback(
    async (id: number, employee: EmployeeInput) => {
      if (id <= 10) {
        await updateEmployee(id, employee);
      }

      dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: {
          id,
          ...employee,
        },
      });
    },
    []
  );

  // DELETE employee
  const removeEmployee = useCallback(async (id: number) => {
    if (id <= 10) {
      await deleteEmployee(id);
    }

    dispatch({
      type: "DELETE_EMPLOYEE",
      payload: id,
    });
  }, []);

  // SELECT employee
  const selectEmployee = useCallback(
    (employee: Employee | null) => {
      dispatch({
        type: "SELECT_EMPLOYEE",
        payload: employee,
      });
    },
    []
  );

  // Initial API call
  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchEmployees]);

  const value = useMemo(
    () => ({
      employees: state.employees,
      selectedEmployee: state.selectedEmployee,
      loading: state.loading,
      error: state.error,
      employeeCount: state.employees.length,
      fetchEmployees,
      createEmployee,
      editEmployee,
      removeEmployee,
      selectEmployee,
    }),
    [
      state,
      fetchEmployees,
      createEmployee,
      editEmployee,
      removeEmployee,
      selectEmployee,
    ]
  );

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}