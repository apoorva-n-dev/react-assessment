
interface HeaderProps {
  employeeCount: number;
}

// Header component receives employee count through props.
export default function Header({ employeeCount }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h2>Employee Dashboard</h2>
        <p>Welcome back! Here's your team overview.</p>
      </div>

      <div className="profile">
        <div>
          <h3>{employeeCount}</h3>
          <p>Total Employees</p>
        </div>

        <div className="avatar">A</div>
      </div>
    </header>
  );
}
