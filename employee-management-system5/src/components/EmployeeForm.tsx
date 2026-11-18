
import { useEffect, useState, useRef } from "react";

import type {
  Employee,
  EmployeeInput
} from "../types/employee.types";

interface EmployeeFormProps {
  selectedEmployee: Employee | null;
  onSubmit: (employee: EmployeeInput) => Promise<void>;
  onCancel: () => void;
}

const initialForm: EmployeeInput = {
  name: "",
  email: "",
  department: "",
  designation: "",
  salary: 0
};

export default function EmployeeForm({
  selectedEmployee,
  onSubmit,
  onCancel
}: EmployeeFormProps) {

  const [form, setForm] = useState<EmployeeInput>(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Persistent render count
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    if (selectedEmployee) {
      const { id, ...employeeData } = selectedEmployee;
      setForm(employeeData);
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [selectedEmployee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === "salary" ? Number(value) : value
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.department.trim() ||
      !form.designation.trim() ||
      form.salary <= 0
    ) {
      setError("Please fill all fields with valid values");
      return;
    }

    try {
      setSaving(true);
      await onSubmit(form);
      setForm(initialForm);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Unable to save employee"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {selectedEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      <p>Form Render Count: {renderCount.current}</p>

      <input
        name="name"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <input
        name="designation"
        placeholder="Designation"
        value={form.designation}
        onChange={handleChange}
      />

      <input
        name="salary"
        type="number"
        placeholder="Salary"
        value={form.salary || ""}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={saving}>
        {saving
          ? "Saving..."
          : selectedEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>

      {selectedEmployee && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
