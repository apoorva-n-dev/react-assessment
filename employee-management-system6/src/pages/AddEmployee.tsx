import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployeeContext } from "../hooks/useEmployeeContext";
import type { EmployeeInput } from "../types/employee.types";

function AddEmployee() {
  const navigate = useNavigate();
  const { createEmployee } = useEmployeeContext();

  const handleSubmit = async (employee: EmployeeInput) => {
    await createEmployee(employee);
    navigate("/employees");
  };

  return (
    <section>
      <h2>Add Employee</h2>
      <EmployeeForm
        selectedEmployee={null}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/employees")}
      />
    </section>
  );
}

export default AddEmployee;