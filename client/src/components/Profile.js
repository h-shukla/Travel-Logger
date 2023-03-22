import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const handleAdminOnClick = () => {
        navigate("/admin");
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user !== null) {
            const parsedUser = JSON.parse(user);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="p-container">
            {isLoggedIn ? (
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
                        <button
                            className="btn btn-a"
                            onClick={handleAdminOnClick}
                        >
                            Admin dashboard
                        </button>
                    ) : (
                        <p></p>
                    )}
                    <button className="btn btn-a" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="profile-container">
                    <Link className="btn btn-a" to="/Login">
                        Login
                    </Link>
                    <Link className="btn btn-a" to="/Signup">
                        Signup
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Profile;
