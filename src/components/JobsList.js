import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import "../App.css"; // Import shared styles

function JobsList({ currentUser }) {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term for job titles
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState(new Set()); // Track applied jobs

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const query = searchTerm ? { title: searchTerm } : {}; // Add title filter if searchTerm exists
        const jobs = await JoblyApi.getJobs(query); // Fetch jobs from backend
        setJobs(jobs);

        // Initialize applied jobs from currentUser
        if (currentUser?.applications) {
          setApplications(new Set(currentUser.applications));
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, [searchTerm, currentUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = e.target.search.value.trim();
    if (term !== searchTerm) {
      setSearchTerm(term); // Update search term to trigger new fetch
    }
  };

  const handleApply = async (jobId) => {
    try {
      await JoblyApi.applyToJob(jobId); // Apply to job via API
      setApplications(new Set([...applications, jobId])); // Update local applications state
      console.log(`Successfully applied to job ID: ${jobId}`);
    } catch (err) {
      console.error("Error applying to job:", err);
      setError("Failed to apply to job. Please try again.");
    }
  };

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="container">
      <h1>Jobs</h1>
      <form onSubmit={handleSearch}>
        <input name="search" placeholder="Search by title" />
        <button type="submit">Search</button>
      </form>
      {jobs.length ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>Company: {job.companyName}</p>
              <p>Salary: {job.salary ? `$${job.salary}` : "Not specified"}</p>
              <p>Equity: {job.equity ? job.equity : "None"}</p>
              <button
                onClick={() => handleApply(job.id)}
                disabled={applications.has(job.id)} // Disable button if already applied
              >
                {applications.has(job.id) ? "Applied" : "Apply"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobsList;



