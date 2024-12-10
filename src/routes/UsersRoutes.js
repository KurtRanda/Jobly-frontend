import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "../components/UsersList"; // For admin
import UserProfile from "../components/UserProfile";
import NewUserForm from "../components/NewUserForm"; // For admin
import EditUserForm from "../components/EditUserForm"; // For admin

function UserRoutes() {
  return (
    <Routes>
      {/* Admin-only route: List all users */}
      <Route path="/users" element={<UsersList />} />

      {/* View user profile */}
      <Route path="/users/:username" element={<UserProfile />} />

      {/* Admin-only route: Create a new user */}
      <Route path="/users/new" element={<NewUserForm />} />

      {/* Admin-only route: Edit a user */}
      <Route path="/users/:username/edit" element={<EditUserForm />} />
    </Routes>
  );
}

export default UserRoutes;
