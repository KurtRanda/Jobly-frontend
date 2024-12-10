import React from "react";
import { NavLink } from "react-router-dom";
import "../Navigation.css";

function Navigation({ currentUser, logout }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        Jobly
      </NavLink>
      <div className="navbar-links">
        {currentUser ? (
          <>
            <NavLink to="/companies" className="nav-link">
              Companies
            </NavLink>
            <NavLink to="/jobs" className="nav-link">
              Jobs
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
            <span className="navbar-user">Hello, {currentUser.username}</span>
            <button onClick={logout} className="nav-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

