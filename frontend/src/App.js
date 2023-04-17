import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>  
      <Routes>
        <Route  path="/" exact element={<Home/>}/>
        <Route  path="/login" exact element={<Login/>}/>
        <Route  path="/signup" exact element={<Signup/>}/>
        <Route  path="/profile" exact element={<Profile/>}/>
        <Route  path="/create-post" exact element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
