import type { Employee } from "../types/employee.types";

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: boolean;
  error: string;
}

export const initialEmployeeState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: "",
};

export type EmployeeAction =
  | { type: "ADD_EMPLOYEE"; payload: Employee }
  | { type: "UPDATE_EMPLOYEE"; payload: Employee }
  | { type: "DELETE_EMPLOYEE"; payload: number }
  | { type: "SET_EMPLOYEES"; payload: Employee[] }
  | { type: "SELECT_EMPLOYEE"; payload: Employee | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export function employeeReducer(
  state: EmployeeState,
  action: EmployeeAction
): EmployeeState {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };

    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id
            ? action.payload
            : employee
        ),
        selectedEmployee:
          state.selectedEmployee?.id === action.payload.id
            ? action.payload
            : state.selectedEmployee,
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
        selectedEmployee:
          state.selectedEmployee?.id === action.payload
            ? null
            : state.selectedEmployee,
      };

    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };

    case "SELECT_EMPLOYEE":
      return {
        ...state,
        selectedEmployee: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}