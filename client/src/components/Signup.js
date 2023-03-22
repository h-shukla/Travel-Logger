import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/Signup.css";

// Required: name, username, email, password
const Signup = () => {
    const navigate = useNavigate();

    const nameRef = useRef();
    const confirmPassRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();
    const userNameRef = useRef();

    const postData = async (
        name,
        email,
        password,
        confirmPassword,
        username
    ) => {
        const res = await fetch("http://localhost:5000/api/v1/user/register", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword,
                username,
            }),
        });
        return res.json();
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (passRef.current.value === confirmPassRef.current.value) {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passRef.current.value;
            const username = userNameRef.current.value;
            const confirmPassword = confirmPassRef.current.value;
            try {
                const res = await postData(
                    name,
                    email,
                    password,
                    confirmPassword,
                    username
                );
                if (res.success === true) {
                    Cookies.set("token", res.token);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.userDetails)
                    );
                    navigate("/home");
                } else {
                    console.log(res);
                    alert("Some internal error occurred");
                }
            } catch (err) {
                console.log(err);
                alert("Some internal error occurred");
            }
        } else {
            alert("Passwords do not match");
        }
        e.target.reset();
    };

    const handleOnchange = (e) => {
        e.target.name = e.target.value;
    };

    return (
        <div className="signup-div-above">
            <form className="signup-form" onSubmit={handleOnSubmit}>
                <h2>Signup</h2>
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">
                        Enter your name:
                    </label>
                    <input
                        ref={nameRef}
                        type="text"
                        onChange={handleOnchange}
                        name=""
                        className="form-control"
                        id="nameID"
                        placeholder="Minimum 4 characters"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Enter your Email:
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        onChange={handleOnchange}
                        name=""
                        className="form-control"
                        id="emailID"
                        aria-describedby="emailHelp"
                        placeholder="Enter a valid email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleinputUsername"
                        className="form-label"
                    >
                        Enter Username:
                    </label>
                    <input
                        ref={userNameRef}
                        type="text"
                        onChange={handleOnchange}
                        name=""
                        className="form-control"
                        id="userNameID"
                        placeholder="Enter username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Enter Password:
                    </label>
                    <input
                        ref={passRef}
                        type="password"
                        onChange={handleOnchange}
                        name=""
                        className="form-control"
                        id="passID"
                        placeholder="minimum 8 characters"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword2"
                        className="form-label"
                    >
                        Confirm Password:
                    </label>
                    <input
                        ref={confirmPassRef}
                        type="password"
                        onChange={handleOnchange}
                        name=""
                        className="form-control"
                        id="confirmPassID"
                        placeholder="minimum 8 characters"
                        required
                    />
                </div>
                <div className="btn-div">
                    <button type="submit" className="btn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
