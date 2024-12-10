import React from "react";
import { Navigate } from "react-router-dom";

/** ProtectedRoute component
 *
 * Redirects to /login if no currentUser is provided.
 * Otherwise, renders the children components.
 */
function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
