import React from "react"
import './Navbar.css'
import {Link} from 'react-router-dom'
// import { Link } from 'react-router-dom'
const Navbar =() =>{
    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to="/" className="brand-logo">Instagram</Link>
            <ul id="nav-mobile" className="right ">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
            </div>
        </nav>
    );
} 
export default Navbar;