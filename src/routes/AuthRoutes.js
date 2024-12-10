import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import HomePage from "../components/HomePage";

function AppRoutes({ login, signup, currentUser }) {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<HomePage currentUser={currentUser} />} />

      {/* Login */}
      <Route path="/login" element={<LoginForm login={login} />} />

      {/* Signup */}
      <Route path="/signup" element={<SignupForm signup={signup} />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
