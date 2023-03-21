import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "../styles/Communities.css";

const Community = () => {
    const params = useParams();
    const navigate = useNavigate();

    const commentRef = useRef();
    const user = JSON.parse(localStorage.getItem("user"));

    const [community, setCommunity] = useState({
        name: "",
        description: "",
        user: "id",
        backgroundImgUrl: "",
        comments: [
            {
                comment: "Hello, world",
                username: "Admin",
                _id: "abc",
            },
        ],
    });

    const getData = async (id) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/community/${id}`
            );
            setCommunity(res.data.community);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCommentAdd = async () => {
        const comment = commentRef.current.value;
        const res = await axios.post(
            `http://localhost:5000/api/v1/community/comments/new/${user._id}`,
            {
                commid: community._id,
                comment: comment,
            },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        if (res.status === 200) {
            alert("comment added");
            commentRef.current.value = "";
            getData(params.commId);
        } else {
            alert("some error occurred");
        }
    };

    const handleCommentDelete = async (id) => {
        const res = await axios.delete(
            `http://localhost:5000/api/v1/community/comments/delete/${community._id}/${id}`
        );
        if (res.status === 200) {
            alert(res.data.message);
            getData(params.commId);
        } else {
            alert("Some error occurred");
        }
    };

    const handleJoinCommunity = async () => {
        const res = await axios.post(
            `http://localhost:5000/api/v1/community/join/`,
            {
                token: Cookies.get("token"),
                commid: community._id,
            }
        );
        if (res.status === 200) {
            alert("joined");
            getData(params.commId);
        }
    };

    const handleDeleteCommunity = async () => {
        const res = await axios.delete(
            `http://localhost:5000/api/v1/community/${community._id}`
        );
        if (res.status === 200) {
            alert("community deleted");
            navigate("/communities");
        } else {
            alert("some error occurred");
        }
    };

    useEffect(() => {
        getData(params.commId);
    }, [params.commId]);

    return (
        <div className="community-page">
            <img className="bg-img" src={community.backgroundImgUrl} alt="" />
            {user._id !== community.user ? (
                <button className="btn btn-a" onClick={handleJoinCommunity}>
                    Join
                </button>
            ) : (
                <></>
            )}
            {user._id === community.user ? (
                <button className="btn btn-a" onClick={handleDeleteCommunity}>
                    Delete Community
                </button>
            ) : (
                <></>
            )}
            <div className="content-sec">
                <p>
                    <b>Name: </b> {community.name}
                </p>
                <p>
                    <b>Description: </b> {community.description}
                </p>
                <p>
                    <b>Members joined: </b>
                    {community.members}
                </p>
                <p>
                    <b>Add comment : </b>
                    <input
                        ref={commentRef}
                        type="text"
                        className="form-control-home"
                        placeholder="Add new comment"
                        style={{
                            minHeight: "2em",
                        }}
                    />
                    <button
                        className="btn btn-a"
                        style={{
                            maxHeight: "3em",
                        }}
                        onClick={handleCommentAdd}
                    >
                        Add
                    </button>
                </p>
                <b>Comments: </b>
                {community.comments.reverse().map((x) => (
                    <div key={x._id} className="comment-div">
                        <p className="comment-p">
                            <b>{x.username}</b> : {x.comment}
                        </p>
                        {user.username === x.username ? (
                            <button
                                className="btn btn-a"
                                style={{
                                    maxHeight: "2em",
                                }}
                                onClick={() => handleCommentDelete(x._id)}
                            >
                                Delete
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
