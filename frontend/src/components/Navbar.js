import React ,{useContext} from "react"
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App'

const Navbar =() =>{
    const {state, dispatch} = useContext(UserContext);
    const navList = () => {
        if(state){
            return[
                <li><Link to="/create-post">CreatePost</Link></li>,
                <li><Link to="/profile">Profile</Link></li>
            ]
        }
        else{
            return[
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    const navigate = useNavigate();
    const logout =() =>{
        localStorage.clear();
        // dispatch({ type : "LOGOUT" });
        // navigate('/login')
    }
    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to={state? "/" : "/login"} className="brand-logo">Instagram</Link>
            <ul id="nav-mobile" className="right ">
                {navList()}
                <li>
                    <button onClick={()=> logout()} className="btn waves-effect waves-light btn #d32f2f red darken-1">Logout</button>

                </li>    
            </ul>
            </div>
        </nav>
    );
} 
export default Navbar;