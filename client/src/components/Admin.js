import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../styles/Admin.css";

const Admin = () => {
    const [communities, setCommunities] = useState([]);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const token = Cookies.get("token");
        const res = await axios.get(
            `http://localhost:5000/api/v1/user/all/${token}`
        );
        setUsers(res.data.message);
    };

    const handleDeleteUsers = async (id) => {
        const token = Cookies.get("token");
        const res = await axios.delete(
            `http://localhost:5000/api/v1/user/deleteuser/${token}/${id}`
        );
        if (res.status === 200) {
            alert("user deleted");
            getUsers();
        } else {
            console.log(res);
            alert("some error occurred");
        }
    };

    const getCommunities = async () => {
        const res = await axios.get(
            `http://localhost:5000/api/v1/community/all/`
        );
        setCommunities(res.data.message);
    };

    const handleDeleteCommunities = async (id) => {
        const token = Cookies.get("token");
        const res = await axios.delete(
            `http://localhost:5000/api/v1/community/admin/delete/${token}/${id}`
        );
        if (res.status === 200) {
            alert("community deleted");
            getCommunities();
        } else {
            console.log(res);
            alert("some error occurred");
        }
    };

    useEffect(() => {
        getUsers();
        getCommunities();
    }, []);

    return (
        <div className="container">
            <div className="users">
                <h1>Users list</h1>
                {users.map((x) => (
                    <div key={x._id} className="users-map">
                        <li>
                            Name: {x.name}, Username: {x.username}, Email:
                            {x.email}
                        </li>
                        <button
                            className="btn btn-a"
                            style={{
                                maxHeight: "2em",
                            }}
                            onClick={() => handleDeleteUsers(x._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div className="communities">
                <h1>Communities list</h1>
                {communities.map((x) => (
                    <div key={x._id} className="users-map">
                        <li>
                            Name : {x.name}, Description :{" "}
                            {x.description.substring(0, 34)}..., Members :
                            {x.members}
                        </li>
                        <button
                            className="btn btn-a"
                            style={{
                                maxHeight: "2em",
                            }}
                            onClick={() => handleDeleteCommunities(x._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
