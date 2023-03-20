import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const navigate = useNavigate();

    const passRef = useRef();
    const emailRef = useRef();

    const postData = async (email, password) => {
        const res = await fetch("http://localhost:5000/api/v1/user/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        return res.json();
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const res = await postData(emailRef.current.value, passRef.current.value);
        try {
            if (res.success === true) {
                navigate("/home");
            } else {
                alert('Invalid credintials');
                e.target.reset();
            }
        } catch (err) {
            alert('Invalid Credintials');
        }
    };

    const handleOnchange = (e) => {
        e.target.name = e.target.value;
    };

    return (
        <div className="login-div-above">
          <form className="login-form" onSubmit={handleOnSubmit}>
            <h2>Login</h2>
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
              <label htmlFor="exampleInputPassword1" className="form-label">
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
            <div className="btn-div">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
    );
};

export default Login;
