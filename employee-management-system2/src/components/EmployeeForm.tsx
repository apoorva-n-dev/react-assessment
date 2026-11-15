
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type {
  Employee,
  EmployeeInput
} from "../types/employee.types";

interface EmployeeFormProps {
  selectedEmployee: Employee | null;
  onSubmit: (employee: EmployeeInput) => Promise<void>;
  onCancel: () => void;
}

export default function EmployeeForm({
  selectedEmployee,
  onSubmit,
  onCancel
}: EmployeeFormProps) {

  const initialForm: EmployeeInput = {
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: 0
  };

  const [form, setForm] = useState<EmployeeInput>(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Populate form when editing an employee
  useEffect(() => {
    if (selectedEmployee) {
      setForm({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        department: selectedEmployee.department,
        designation: selectedEmployee.designation,
        salary: selectedEmployee.salary
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [selectedEmployee]);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value
    }));
  };

  // Form validation
  const validateForm = (): boolean => {

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.department ||
      !form.designation.trim() ||
      !form.salary
    ) {
      setError("Please fill all fields.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (form.salary <= 0) {
      setError("Salary must be greater than zero.");
      return false;
    }

    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      await onSubmit(form);

      setForm(initialForm);
      setError("");

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>

      <h2>
        {selectedEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      <div className="form-group">
        <label>Employee Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter employee name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email address"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      <div className="form-group">
        <label>Designation</label>
        <input
          type="text"
          name="designation"
          placeholder="Enter designation"
          value={form.designation}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input
          type="number"
          name="salary"
          placeholder="Enter salary"
          value={form.salary || ""}
          onChange={handleChange}
          min="1"
        />
      </div>

      {error && (
        <p className="form-error">{error}</p>
      )}

      <div className="form-actions">

        <button
          type="submit"
          className="submit-btn"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : selectedEmployee
            ? "Update Employee"
            : "Add Employee"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            setForm(initialForm);
            setError("");
            onCancel();
          }}
        >
          Cancel
        </button>

      </div>

    </form>
  );
}
