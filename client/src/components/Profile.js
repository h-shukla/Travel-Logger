import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        _id: "640f73d90d29d730ed89c34f",
        name: "Admin",
        username: "Admin",
        email: "admin@test.com",
        role: "admin",
    });

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate("/");
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        const parsedUser = JSON.parse(user);
        if (parsedUser !== null || parsedUser !== undefined) {
            setUser(parsedUser);
        }
    }, []);

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
                <button className="btn btn-a" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
