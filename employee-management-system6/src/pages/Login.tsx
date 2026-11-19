import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <section>
      <h2>Login</h2>
      <p>Demo login page</p>
      <button type="button" onClick={() => navigate("/dashboard")}>
        Continue to Dashboard
      </button>
    </section>
  );
}

export default Login;