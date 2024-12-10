import React, { useState, useEffect } from "react";
import JoblyApi from "../api";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await JoblyApi.getUsers();
        setUsers(users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <a href={`/users/${user.username}`}>
              {user.firstName} {user.lastName} ({user.username})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
