import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useEmployeeContext } from "../hooks/useEmployeeContext";
import { useSettings } from "../hooks/useSettings";

import SearchBar from "../components/SearchBar";
import DepartmentFilter from "../components/DepartmentFilter";
import EmployeeList from "../components/EmployeeList";
import type { Employee } from "../types/employee.types";

function Employees() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { employees, removeEmployee } = useEmployeeContext();
  const { selectedDepartment, setSelectedDepartment, viewMode } = useSettings();

  const search = searchParams.get("search") || "";
  const department = searchParams.get("department") || selectedDepartment;

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState("");

  const departments = useMemo(
    () => [...new Set(employees.map((emp) => emp.department))],
    [employees]
  );

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All" || emp.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  const updateFilters = (newSearch: string, newDepartment: string) => {
    const params = new URLSearchParams();

    if (newSearch) params.set("search", newSearch);
    if (newDepartment !== "All") {
      params.set("department", newDepartment);
    }

    setSearchParams(params);
    setSelectedDepartment(newDepartment);
  };

  const handleEdit = (employee: Employee) => {
    navigate(`/employees/edit/${employee.id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      setActionError("");
      setDeletingId(id);
      await removeEmployee(id);
    } catch (error) {
      console.error(error);
      setActionError("Unable to delete employee");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <h2>Employee List</h2>

      {actionError && <p className="error">{actionError}</p>}

      <button type="button" onClick={() => navigate("/employees/add")}>
        Add Employee
      </button>

      <SearchBar
        search={search}
        onSearchChange={(value) => updateFilters(value, department)}
      />

      <DepartmentFilter
        departments={departments}
        selectedDepartment={department}
        onDepartmentChange={(value) => updateFilters(search, value)}
      />

      <p>Showing {filteredEmployees.length} employees</p>

      <EmployeeList
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        deletingId={deletingId}
        viewMode={viewMode}
      />
    </section>
  );
}

export default Employees;