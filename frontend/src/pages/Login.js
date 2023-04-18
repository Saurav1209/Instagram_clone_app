import React,{useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'
function Login() {

  const navigate = useNavigate() ;
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const login = ()=>{

    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      M.toast({html : "Enter valid email", classes: "#c62828 red darken-3"})
      return 
    }



    fetch("/login",{
      method:"post",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
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
        M.toast({html : "Lofin  Successful!", classes: "#388e3c green darken-2"});
        navigate("/")
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
        <button onClick={()=>login()} className="btn waves-effect waves-light btn #64b5f6 blue darken-1">Login</button>
        <h6>
          <Link to="/signup">Don't have an account ?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Login
