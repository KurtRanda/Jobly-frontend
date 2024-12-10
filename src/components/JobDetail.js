import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";

function JobDetail() {
  const { id } = useParams(); // Get job ID from the URL
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const jobData = await JoblyApi.getJob(id); // Fetch job details by ID
        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;

  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h1>{job.title}</h1>
      <p>Company: {job.companyName}</p>
      <p>Salary: {job.salary}</p>
      <p>Equity: {job.equity}</p>
    </div>
  );
}

export default JobDetail;

