import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

// if title has space, have the map link replacing space with '+'
const Home = () => {
    const titleRef = useRef();
    const commentRef = useRef();
    const latRef = useRef();
    const lngRef = useRef();
    const dateRef = useRef();
    const imgRef = useRef();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logs, setLogs] = useState([]);

    const getData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        // console.log(user._id);
        const res = await axios.get(
            `http://localhost:5000/api/v1/logs/mylogs/${user._id}`
        );
        // console.log(res);
        setLogs(res.data.userLogs);
    };

    const postData = async (
        title,
        comments,
        latitude,
        longitude,
        date,
        urlToImage
    ) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const res = await axios.post(
                `http://localhost:5000/api/v1/logs/new/${user._id}`,
                {
                    title,
                    comments,
                    latitude,
                    longitude,
                    date,
                    urlToImage,
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                alert("log added");
            } else {
                alert("some error occurred");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const resetRefs = () => {
        titleRef.current.value = "";
        commentRef.current.value = "";
        latRef.current.value = "";
        lngRef.current.value = "";
        dateRef.current.value = "";
        imgRef.current.value = "";
    };

    const handleOnClick = async () => {
        const title = titleRef.current.value;
        const comments = commentRef.current.value;
        const latitude = latRef.current.value;
        const longitude = lngRef.current.value;
        const date = dateRef.current.value;
        const urlToImage = imgRef.current.value;
        await postData(title, comments, latitude, longitude, date, urlToImage);
        getData();
        resetRefs();
    };

    const handleDeleteLog = async (id) => {
        const res = await axios.delete(
            `http://localhost:5000/api/v1/logs/${id}`
        );
        if (res.status === 200) {
            alert("log deleted");
            getData();
        } else {
            alert("some error occurred");
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user !== null) {
            setIsLoggedIn(true);
            getData();
        }
    }, []);

    return (
        <div className="home-container">
            {isLoggedIn ? (
                <>
                    <div className="new-log-container">
                        <h3>New Log</h3>
                        <div className="new-log">
                            <div className="m-2">
                                <label htmlFor="title">Title :</label>
                                <input
                                    ref={titleRef}
                                    type="text"
                                    placeholder="Enter Location's name"
                                    className="form-control-home"
                                    required
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="comments">Comments :</label>
                                <input
                                    ref={commentRef}
                                    type="text"
                                    placeholder="Enter your comments"
                                    className="form-control-home"
                                    required
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="latitude">Latitude :</label>
                                <input
                                    ref={latRef}
                                    type="number"
                                    placeholder="Location's latitude"
                                    className="form-control-home"
                                    required
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="longitude">Longitude :</label>
                                <input
                                    ref={lngRef}
                                    type="number"
                                    placeholder="Location's longitude"
                                    className="form-control-home"
                                    required
                                />
                            </div>
                            <div className="m-2">
                                <label htmlFor="date">Date :</label>
                                <input
                                    ref={dateRef}
                                    type="date"
                                    placeholder="Enter visit date"
                                    className="form-control-home"
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
                    <div className="previous-logs">
                        {logs.map((m) => (
                            <div className="logs" key={m._id}>
                                <img
                                    src={m.urlToImage}
                                    alt="location's pic here"
                                />
                                <p>
                                    <b>{m.title}</b>
                                </p>
                                <p>{m.comments}</p>
                                <a
                                    href={m.link}
                                    className="view-maps"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on google maps
                                </a>
                                <button
                                    className="btn"
                                    onClick={() => handleDeleteLog(m._id)}
                                    style={{
                                        marginLeft: ".5em",
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h3>Please Log in first</h3>
            )}
        </div>
    );
};

export default Home;
