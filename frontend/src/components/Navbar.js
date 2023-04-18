import React ,{useContext} from "react"
import './Navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

const Navbar =() =>{
    const {state, dispatch} = useContext(UserContext);
    const navList = () => {
        if(state){
            return[
                <li><Link to="/create-post">CreatePost</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li>
                    <button onClick={()=> logout()} className="btn waves-effect waves-light btn #d32f2f red darken-1">Logout</button>
                </li>  
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
        dispatch({ type : "LOGOUT" });
        M.toast({html : "Logged Out Successful!", classes: "#388e3c green darken-2"});
        navigate('/login')
    }
    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to={state? "/" : "/login"} className="brand-logo">Instagram</Link>
            <ul id="nav-mobile" className="right ">
                {navList()}       
            </ul>
            </div>
        </nav>
    );
} 
export default Navbar;