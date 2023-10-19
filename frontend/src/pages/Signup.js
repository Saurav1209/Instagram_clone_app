import React,{useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'
import './Signup.css' ;


function Signup() {

  const navigate = useNavigate() ;
  const [fullName,setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const url = process.env.REACT_APP_BACKEND_URL

  const register = ()=>{
    /* eslint-disable no-useless-escape*/
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      M.toast({html : "Enter valid email", classes: "#c62828 red darken-3"})
      return 
    }



    fetch(url+"/register",{
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
        M.toast({html : data.error, classes: "#c62828 red darken-3"})
      }
      else{
        M.toast({html : data.result, classes: "#388e3c green darken-2"});
        navigate("/login")
      }
    })
    .catch((error)=>{
      console.log(error);
  });
  }

  return (
    <div className="login-container">
      <div className="card login-card input-field">
        <h2>Instagram</h2>
        <div>
            <input 
              type="text" placeholder="Full name"
              value={fullName}
              onChange={(event)=> setFullName(event.target.value)}
              
            />
            <input 
              type="text" placeholder="Email"
              value={email}
              onChange={(event)=> setEmail(event.target.value)}  
            
            />
            <input 
              type="password" placeholder="Password"
              value={password}
              onChange={(event)=> setPassword(event.target.value)}
            />
        </div>
       
        <button onClick={()=>register()} className="btn waves-effect waves-light btn #d32f2f red darken-1">Signup</button>
        <h6>
          <Link to="/login">Already have an account ?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Signup
