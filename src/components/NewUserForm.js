import React, { useState } from "react";
import JoblyApi from "../api";

function NewUserForm() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    isAdmin: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((data) => ({ ...data, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.createUser(formData);
      setFormData({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        isAdmin: false,
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input name="username" value={formData.username} onChange={handleChange} />
      <label>First Name:</label>
      <input name="firstName" value={formData.firstName} onChange={handleChange} />
      <label>Last Name:</label>
      <input name="lastName" value={formData.lastName} onChange={handleChange} />
      <label>Password:</label>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <label>Email:</label>
      <input name="email" value={formData.email} onChange={handleChange} />
      <label>Is Admin:</label>
      <input
        name="isAdmin"
        type="checkbox"
        checked={formData.isAdmin}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
      <button type="submit">Add User</button>
    </form>
  );
}

export default NewUserForm;
