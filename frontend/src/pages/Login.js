import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
  return (
    <div className="login-container">

      <div className="card login-card input-field">
        <h2>Instagram</h2>
        <input type="text" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button className="btn waves-effect waves-light btn #64b5f6 blue darken-1">Login</button>
        <h6>
          <Link to="/signup">Don't have an account ?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Login
