import { useState } from "react";
import { useAuth } from "../states/auth";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const { username, password, firstName, lastName, email } = formRegister;

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormRegister({ ...formRegister, [name]: value });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formRegister, navigate);
  };
  return (
    <div className="container">
      <div className="login-container">
        <h2 className="login-title">Register</h2>
        <form autoComplete="off" onSubmit={submit}>
          <input
            required
            onChange={handleForm}
            value={firstName}
            id="firstName"
            name="firstName"
            className="login-input"
            type="text"
            placeholder="Firstname"
          />

          <input
            required
            onChange={handleForm}
            value={lastName}
            id="lastName"
            name="lastName"
            className="login-input"
            type="text"
            placeholder="Lastname"
          />

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
            value={email}
            id="email"
            name="email"
            className="login-input"
            type="email"
            placeholder="Email"
          />

          <input
            required
            onChange={handleForm}
            value={password}
            id="password"
            name="password"
            className="login-input"
            type={"password"}
            placeholder="Password"
          />
          <button
            typeof="submit"
            className="button"
          >
            Register
          </button>
          <p className="login-reg">
          Don't have an account?
          <Link to="/"> Login</Link>
        </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
