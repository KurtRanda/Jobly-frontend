import React, { useState } from "react";

function SignupForm({ signup }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);

  // Update form data on input change
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  // Handle form submission
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData); // Call signup function passed via props
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div className="SignupForm">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.length > 0 && (
          <div className="errors">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupForm;
