import React, { useState } from "react";
import JoblyApi from "../api";

function NewCompanyForm() {
  const [formData, setFormData] = useState({
    handle: "",
    name: "",
    description: "",
    numEmployees: "",
    logoUrl: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.createCompany(formData);
      setFormData({
        handle: "",
        name: "",
        description: "",
        numEmployees: "",
        logoUrl: "",
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Handle:</label>
      <input name="handle" value={formData.handle} onChange={handleChange} />
      <label>Name:</label>
      <input name="name" value={formData.name} onChange={handleChange} />
      <label>Description:</label>
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Number of Employees:</label>
      <input
        name="numEmployees"
        value={formData.numEmployees}
        onChange={handleChange}
      />
      <label>Logo URL:</label>
      <input name="logoUrl" value={formData.logoUrl} onChange={handleChange} />
      {error && <p>{error}</p>}
      <button type="submit">Add Company</button>
    </form>
  );
}

export default NewCompanyForm;
