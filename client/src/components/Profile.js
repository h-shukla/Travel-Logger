import React, { useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    _id: "640f73d90d29d730ed89c34f",
    name: "Admin",
    username: "Admin",
    email: "admin@test.com",
    role: "admin",
  });
  return (
    <div className="p-container">
      <div className="profile-container">
        <h3>User Profile</h3>
        <p>
          Name: <b>{user.name}</b>
        </p>
        <p>
          username: <b>{user.username}</b>
        </p>
        <p>
          email: <b>{user.email}</b>
        </p>
        <button className="btn btn-a">Edit profile</button>
        <button className="btn">Remove account</button>
        {user.role === "admin" ? (
          <button className="btn btn-a">Admin dashboard</button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Profile;
