import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Use shared styles

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/"); // Redirect to homepage on success
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-header">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.length > 0 && (
          <ul className="error-list">
            {errors.map((err, idx) => (
              <li key={idx} className="error-item">
                {err}
              </li>
            ))}
          </ul>
        )}
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

