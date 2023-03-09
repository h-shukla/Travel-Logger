import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Signup.css";

// Required: name, username, email, password
const Signup = () => {
    const navigate = useNavigate();

    const nameRef = useRef();
    const confirmPassRef = useRef();
    const passRef = useRef();
    const emailRef = useRef();

    const postData = async () => {
        
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (passRef.current.value === confirmPassRef.current.value) {
            const name = nameRef.current.value;
            const email = emailRef.current.value;
            const password = passRef.current.value;
            const res = await postData(name, email, password);
            if (res.success === true) {
                navigate('/home');
            } else {
                alert('Some internal error occurred');
            }
        } else {
            alert('Passwords do not match');
        }
        e.target.reset();
    };

    const handleOnchange = (e) => {
        e.target.name = e.target.value;
    };

    return (
        <div>
          <form className='login-form mt-5' onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Enter your name</label>
              <input ref={nameRef} type="text" onChange={handleOnchange} name='' className="form-control" id="nameID" placeholder='Minimum 4 characters' />
            </div >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Enter your Email address</label>
              <input ref={emailRef} type="email" onChange={handleOnchange} name='' className="form-control" id="emailID" aria-describedby="emailHelp" placeholder='Enter a valid email' />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Enter Password</label>
              <input ref={passRef} type="password" onChange={handleOnchange} name='' className="form-control" id="passID" placeholder='minimum 8 characters' />
            </div >
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
              <input ref={confirmPassRef} type="password" onChange={handleOnchange} name='' className="form-control" id="confirmPassID" placeholder='minimum 8 characters' />
            </div >
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form >
        </div>
    );
};

export default Signup
