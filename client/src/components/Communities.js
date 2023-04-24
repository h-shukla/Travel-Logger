import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/Communities.css";

const Communities = () => {
    const nameRef = useRef();
    const descriptionRef = useRef();
    const imgRef = useRef();

    const [usr, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [communities, setCommunities] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/community/all/`
            );
            if (res.status === 200) {
                setCommunities(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const postData = async (name, description, user, backgroundImgUrl) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/v1/community/new/`,
                {
                    name,
                    description,
                    user,
                    backgroundImgUrl,
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                alert("Community added");
                const join = await axios.post(
                    `http://localhost:5000/api/v1/community/join/`,
                    {
                        token: Cookies.get("token"),
                        commid: res.data.community._id,
                    }
                );
                if (join.status === 200) {
                    console.log(join.data.success);
                }
            } else {
                alert("some error occurred");
            }
            getData();
        } catch (err) {
            console.log(err);
        }
    };

    const resetRefs = () => {
        nameRef.current.value = "";
        descriptionRef.current.value = "";
        imgRef.current.value = "";
    };

    const handleOnClick = async () => {
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const user = usr._id;
        const backgroundImgUrl = imgRef.current.value;
        await postData(name, description, user, backgroundImgUrl);
        resetRefs();
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        if (data) {
            setUser(data);
            setIsLoggedIn(true);
        }
        getData();
    }, []);

    return (
        <div className="community-container">
            {isLoggedIn ? (
                <div className="new-log-container">
                    <h3>New Community</h3>
                    <div className="new-log">
                        <div className="m-2">
                            <label htmlFor="name">Name :</label>
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder="Enter Location's name"
                                className="form-control-home"
                                required
                            />
                        </div>
                        <div className="m-2">
                            <label htmlFor="description">Description :</label>
                            <input
                                ref={descriptionRef}
                                type="text"
                                placeholder="Enter description"
                                className="form-control-home"
                                required
                            />
                        </div>
                        <div className="m-2">
                            <label htmlFor="image">Image URL :</label>
                            <input
                                ref={imgRef}
                                type="text"
                                placeholder="image url"
                                className="form-control-home"
                            />
                        </div>
                    </div>
                    <div className="btn-div">
                        <button
                            type="submit"
                            className="log-btn"
                            onClick={handleOnClick}
                        >
                            create
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {/* <div className="search">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for communities"
                />
                <button className="btn">Search</button>
            </div> */}
            <div className="community-list">
                {communities.map((x) => (
                    <Link
                        className="link-item"
                        key={x.name}
                        to={`/communities/${x._id}`}
                    >
                        <p>
                            <b>{x.name}</b>
                        </p>
                        <p>{x.description.substring(0, 120)}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Communities;
