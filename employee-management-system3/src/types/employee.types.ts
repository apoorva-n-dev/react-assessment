export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
}

export type EmployeeInput=Omit<Employee,"id">;

// JSONPlaceholder API response structure
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}
