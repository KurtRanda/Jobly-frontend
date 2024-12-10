import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function UserProfile({ currentUser, setCurrentUser, updateUser }) {
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    password: "",
  });
  const [jobApplications, setJobApplications] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // Toggle for edit mode
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        if (currentUser) {
          const appliedJobs = await JoblyApi.getAppliedJobs(currentUser.username);
          setJobApplications(appliedJobs || []);
          setFilteredJobs(appliedJobs || []);
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setError("Failed to load job applications.");
      }
    }
    fetchAppliedJobs();
  }, [currentUser]);

  useEffect(() => {
    const filtered = jobApplications.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobApplications]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (!formData.password) {
        throw new Error("Password is required to save changes.");
      }

      const updatedUser = await updateUser(currentUser.username, formData);
      setCurrentUser(updatedUser);
      setFormData((f) => ({
        ...f,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        password: "",
      }));
      setIsEditable(false); // Exit edit mode after saving
    } catch (err) {
      setError(err);
      console.error("Error updating profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentUser) return <p>Loading user data...</p>;

  return (
    <div className="container">
      <h1>Profile</h1>

      <div>
        <h2>Your Details</h2>
        {!isEditable ? (
          <div className="profile-display">
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <button onClick={() => setIsEditable(true)} className="form-button">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password (Required to Save Changes):</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            <button type="submit" disabled={isSaving} className="form-button">
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditable(false)}
              className="form-button cancel-button"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <div>
        <h2>Job Applications</h2>
        <input
          type="text"
          placeholder="Search applied jobs"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filteredJobs.length > 0 ? (
          <ul>
            {filteredJobs.map((job) => (
              <li key={job.id}>
                <h3>{job.title}</h3>
                <p>Company: {job.companyName}</p>
                <p>Salary: {job.salary ? `$${job.salary}` : "Not specified"}</p>
                <p>
                  Applied:{" "}
                  {job.appliedAt
                    ? new Date(job.appliedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job applications found.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;






