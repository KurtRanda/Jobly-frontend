import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import "../App.css"; // Shared styles

function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        if (searchTerm.trim() === "") {
          const companies = await JoblyApi.getCompanies();
          setCompanies(companies);
        } else {
          const companies = await JoblyApi.getCompanies({ name: searchTerm });
          setCompanies(companies);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompanies();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.search.value.trim();
    if (newSearchTerm !== searchTerm) {
      setSearchTerm(newSearchTerm);
    }
  };

  if (isLoading) return <p>Loading companies...</p>;

  return (
    <div className="container">
      <h1>Companies</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          name="search"
          placeholder="Search by name"
          className="search-input"
        />
        <button type="submit" className="form-button">
          Search
        </button>
      </form>
      {companies.length ? (
        <ul>
          {companies.map((company) => (
            <li key={company.handle} className="box">
              <a href={`/companies/${company.handle}`} className="company-name">
                {company.name}
              </a>
              <p>{company.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}

export default CompaniesList;

