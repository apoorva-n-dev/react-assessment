import { Link, useParams } from "react-router-dom";
import { useEmployeeContext } from "../hooks/useEmployeeContext";

function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const { employees } = useEmployeeContext();

  const employee = employees.find((emp) => emp.id === Number(id));

  if (!employee) {
    return (
      <section>
        <h2>Employee Not Found</h2>
        <Link to="/employees">Back to Employees</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Employee Details</h2>
      <div className="employee-card">
        <h3>{employee.name}</h3>
        <p>ID: {employee.id}</p>
        <p>Email: {employee.email}</p>
        <p>Department: {employee.department}</p>
        <p>Designation: {employee.designation}</p>
        <p>Salary: ₹{employee.salary}</p>
        <Link to={`/employees/edit/${employee.id}`}>Edit Employee</Link>
        <br />
        <Link to="/employees">Back to Employees</Link>
      </div>
    </section>
  );
}

export default EmployeeDetails;