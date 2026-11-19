import { Link, useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import type { EmployeeInput } from "../types/employee.types";

function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { employees, editEmployee } = useEmployeeContext();

  const employee = employees.find((emp) => emp.id === Number(id));

  if (!employee) {
    return (
      <section>
        <h2>Employee Not Found</h2>
        <Link to="/employees">Back to Employees</Link>
      </section>
    );
  }

  const handleSubmit = async (updatedEmployee: EmployeeInput) => {
    await editEmployee(employee.id, updatedEmployee);
    navigate("/employees");
  };

  return (
    <section>
      <h2>Edit Employee</h2>
      <EmployeeForm
        selectedEmployee={employee}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/employees")}
      />
    </section>
  );
}

export default EditEmployee;