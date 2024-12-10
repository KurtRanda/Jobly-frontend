import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

function CompanyDetail({ currentUser }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState(new Set()); // Track applied jobs
  const [searchTerm, setSearchTerm] = useState(""); // Track search term
  const [filteredJobs, setFilteredJobs] = useState([]); // Track filtered jobs

  console.log("Current user in CompanyDetail:", currentUser); // Debugging

  useEffect(() => {
    async function fetchCompany() {
      try {
        console.log(`Fetching company details for handle: ${handle}`);
        const company = await JoblyApi.getCompany(handle);
        console.log("Fetched company data:", company); // Confirm response
        setCompany(company);
        setFilteredJobs(company.jobs || []); // Initialize filtered jobs with all jobs

        // Initialize applied jobs from currentUser
        if (currentUser?.applications) {
          setApplications(new Set(currentUser.applications));
        }
      } catch (err) {
        console.error("Error fetching company details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCompany();
  }, [handle, currentUser]);

  useEffect(() => {
    // Filter jobs when the search term changes
    if (company?.jobs) {
      const filtered = company.jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, company]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApply = async (jobId) => {
    if (!jobId || isNaN(jobId)) {
      console.error("Invalid jobId:", jobId);
      return;
    }

    try {
      await JoblyApi.applyToJob(jobId); // Apply to job via API
      setApplications(new Set([...applications, jobId])); // Update local applications state
      console.log(`Successfully applied to job ${jobId}`);
    } catch (err) {
      console.error("Error applying to job:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div className="container">
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h2>Jobs</h2>
      <input
        type="text"
        placeholder="Search jobs by title"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ul>
        {filteredJobs.map((job) => (
          <li key={job.id} className="box">
            <h3>{job.title}</h3>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
            <button
              onClick={() => handleApply(job.id)}
              disabled={applications.has(job.id)}
              className="form-button"
            >
              {applications.has(job.id) ? "Applied" : "Apply"}
            </button>
          </li>
        ))}
      </ul>
      {filteredJobs.length === 0 && <p>No jobs match your search.</p>}
    </div>
  );
}

export default CompanyDetail;


