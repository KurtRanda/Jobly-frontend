import React from "react";
import { Routes, Route } from "react-router-dom";
import JobsList from "../components/JobsList";
import JobDetail from "../components/JobDetail";
import NewJobForm from "../components/NewJobForm"; // For admin
import EditJobForm from "../components/EditJobForm"; // For admin

function JobRoutes() {
  return (
    <Routes>
      {/* List all jobs */}
      <Route path="/jobs" element={<JobsList />} />

      {/* View job details */}
      <Route path="/jobs/:id" element={<JobDetail />} />

      {/* Admin-only routes */}
      <Route path="/jobs/new" element={<NewJobForm />} />
      <Route path="/jobs/:id/edit" element={<EditJobForm />} />
    </Routes>
  );
}

export default JobRoutes;
