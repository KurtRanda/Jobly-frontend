import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./api";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import CompaniesList from "./components/CompaniesList";
import CompanyDetail from "./components/CompanyDetail";
import JobsList from "./components/JobsList";
import JobDetail from "./components/JobDetail";
import UserProfile from "./components/UserProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jobly-token") || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    JoblyApi.token = token;
  }, [token]);

  useEffect(() => {
    async function fetchUserData() {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    }

    setIsLoading(true);
    fetchUserData();
  }, [token]);

  async function login(loginData) {
    const newToken = await JoblyApi.login(loginData);
    setToken(newToken);
    localStorage.setItem("jobly-token", newToken);
  }

  async function signup(signupData) {
    const newToken = await JoblyApi.signup(signupData);
    setToken(newToken);
    localStorage.setItem("jobly-token", newToken);
  }

  async function updateUser(username, userData) {
    try {
      const updatedUser = await JoblyApi.updateUser(username, userData);
      setCurrentUser((prev) => ({
        ...prev,
        ...updatedUser,
      }));
      return updatedUser;
    } catch (err) {
      console.error("Error updating user:", err);
      throw err;
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("jobly-token");
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="App">
        <Navigation currentUser={currentUser} logout={logout} />
        <header>
          <h1>Jobly</h1>
        </header>
        <main>
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<HomePage currentUser={currentUser} />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />

            {/* Protected Companies Routes */}
            <Route
              path="/companies"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <CompaniesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies/:handle"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <CompanyDetail currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </ProtectedRoute>
              }
            />

            {/* Protected Jobs Route */}
            <Route
              path="/jobs"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <JobsList currentUser={currentUser} setCurrentUser={setCurrentUser} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <JobDetail />
                </ProtectedRoute>
              }
            />

            {/* User Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <UserProfile
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    updateUser={updateUser} // Pass updateUser here
                />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users/:username"
              element={
                currentUser ? (
                  <UserProfile currentUser={currentUser} updateUser={updateUser} />
                ) : (
              <Navigate to="/login" />
                )
              }
            />
            {/* Catch-All Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

