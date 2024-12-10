import React, { useState } from "react";
import JoblyApi from "../api";

function NewJobForm() {
  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    equity: "",
    companyHandle: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.createJob(formData);
      setFormData({
        title: "",
        salary: "",
        equity: "",
        companyHandle: "",
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label>Salary:</label>
      <input name="salary" value={formData.salary} onChange={handleChange} />
      <label>Equity:</label>
      <input name="equity" value={formData.equity} onChange={handleChange} />
      <label>Company Handle:</label>
      <input
        name="companyHandle"
        value={formData.companyHandle}
        onChange={handleChange}
      />
      {error && <p>{error}</p>}
      <button type="submit">Add Job</button>
    </form>
  );
}

export default NewJobForm;
