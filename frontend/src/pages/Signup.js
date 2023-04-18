import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const register = ()=>{
    fetch("/register",{
      method:"post",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        fullName : fullName,
        email : email,
        password:password
      })
    })
    .then(response=>response.json())
    .then(function(data){
      console.log(data);
      if(data.error){
        M.toast({html : data.error})
      }
    });
  }

  return (
    <div className="login-container">
      <div className="card login-card input-field">
        <h2>Instagram</h2>
        <input 
          type="text" placeholder="Full name"
          value={email}
          onChange={(event)=> setEmail(event.target.value)}  
        />
        <input 
          type="text" placeholder="Email"
          value={password}
          onChange={(event)=> setPassword(event.target.value)}
        />
        <input 
          type="password" placeholder="Password"
          value={fullName}
          onChange={(event)=> setFullName(event.target.value)}
        />
        <button onClick={()=>register()} className="btn waves-effect waves-light btn #64b5f6 blue darken-1">Signup</button>
        <h6>
          <Link to="/login">Already have an account ?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Signup
