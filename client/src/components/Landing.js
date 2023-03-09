import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Landing.css";

const Landing = () => {
    return (
        <div className='landing'>
            <div className="container">
                <h2>Welcome to TRAVEL LOGGER</h2>
                <h3>Your personal Travel Diary</h3>
                <Link className='link' to='/login'>Get Started</Link>
            </div>
        </div>
    )
}

export default Landing