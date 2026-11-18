import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw new Error(
      "useEmployeeContext must be used inside EmployeeProvider"
    );
  }

  return context;
}