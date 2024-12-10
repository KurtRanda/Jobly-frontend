import React from "react";
import { Routes, Route } from "react-router-dom";
import CompaniesList from "../components/CompaniesList";
import CompanyDetail from "../components/CompanyDetail";
import NewCompanyForm from "../components/NewCompanyForm"; // For admin
import EditCompanyForm from "../components/EditCompanyForm"; // For admin



function CompaniesRoutes() {
  return (
    <Routes>
      {/* List all companies */}
      <Route path="/companies" element={<CompaniesList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      {/* Admin-only routes */}
      <Route path="/companies/new" element={<NewCompanyForm />} />
      <Route path="/companies/:handle/edit" element={<EditCompanyForm />} />
    </Routes>
  );
}

export default CompaniesRoutes;
