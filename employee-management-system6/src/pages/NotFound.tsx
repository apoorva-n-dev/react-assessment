import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>Page not found.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </section>
  );
}

export default NotFound;