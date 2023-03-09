import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link className='icon' to="/">Travel Logger</Link>
            <Link className='item' to="/home">Home</Link>
            <Link className='item' to="/About">About</Link>
            <Link className='item' to="/Contact">Contact</Link>
            <Link className='item' to="/Communities">Communities</Link>
            <Link className='item' to="/Login">Login</Link>
            <Link className='item' to="/Signup">Signup</Link>
            <Link className='item' to="/Profile">Profile</Link>
        </div>
    )
}

export default Navbar;