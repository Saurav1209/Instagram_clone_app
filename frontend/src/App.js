import React, {useEffect , createContext, useReducer, useContext} from "react";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import './App.css';
import {reducer,initialState} from './reducer/userReducer';

export const UserContext = createContext();

const CustomRouting = () =>{
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){
      dispatch({type:"USER", payload : userInfo})
      navigate('/')
    }
    else{
      navigate('/login');
    }
  }, []);//called when component mount and get called only once

  return(//switch used in old version
    <>
      <Routes>
        <Route  path="/" exact element={<Home/>}/>
        <Route  path="/login" exact element={<Login/>}/>
        <Route  path="/signup" exact element={<Signup/>}/>
        <Route  path="/profile" exact element={<Profile/>}/>
        <Route  path="/create-post" exact element={<CreatePost/>}/>
      </Routes>
    </>
    
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state : state , dispatch : dispatch}}>
    <BrowserRouter>
      <Navbar/>  
      <CustomRouting/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
