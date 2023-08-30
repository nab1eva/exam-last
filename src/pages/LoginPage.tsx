import { useState } from "react";
import { useAuth } from "../states/auth";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formLogin, setFormLogin] = useState({ username: "", password: "" });
  const { username, password } = formLogin;

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formLogin, navigate);
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form autoComplete="off" onSubmit={submit}>
          <input
            required
            onChange={handleForm}
            value={username}
            id="username"
            name="username"
            className="login-input"
            type="text"
            placeholder="Username"
          />

          <input
            required
            onChange={handleForm}
            value={password}
            id="password"
            name="password"
            className="login-input relative"
            type={"password"}
            placeholder="Password"
          />

          <button typeof="submit" className="button">
            Login
          </button>
          <p className="login-reg">
          Don't have an account?
          <Link to="/register">
            {" "}
            Register
          </Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
