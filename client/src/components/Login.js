import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const passRef = useRef();
  const emailRef = useRef();

  const postData = async () => {

  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const res = await postData(email, password);
    if (res.success === true) {
      navigate('/home');
    } else {
      alert("Couldn't sign in!!! Some error occurred");
    }
    e.target.reset();
  };

  const handleOnchange = (e) => {
    e.target.name = e.target.value;
  };
  return (
    <div className='div-above'>
      <form className='signup-form' onSubmit={handleOnSubmit}>
        <h2>Login</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter your Email:</label>
          <input ref={emailRef} type="email" onChange={handleOnchange} name='' className="form-control" id="emailID" aria-describedby="emailHelp" placeholder='Enter a valid email' required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Enter Password:</label>
          <input ref={passRef} type="password" onChange={handleOnchange} name='' className="form-control" id="passID" placeholder='minimum 8 characters' required />
        </div >
        <div className="btn-div">
          <button type="submit" className="btn">Submit</button>
        </div>
      </form >
    </div>
  )
}

export default Login
