import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="card home-card">
        <h5>John Doe</h5>
         <div className="card-image">
          <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5zdGFncmFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>

         </div>
         <div className="card-content">
         <i className="material-icons" style={{color: "red"}}>favorite</i>
          <h6>Post Title</h6>
            <p>welcome to the virtual world</p>
            <input  type = "text" placeholder=" Enter comment"/>
         </div>

      </div>
      <div className="card home-card">
        <h5>John Doe</h5>
         <div className="card-image">
          <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5zdGFncmFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>

         </div>
         <div className="card-content">
         <i className="material-icons" style={{color: "red"}}>favorite</i>
          <h6>Post Title</h6>
            <p>welcome to the virtual world</p>
            <input  type = "text" placeholder=" Enter comment"/>
         </div>

      </div>
      <div className="card home-card">
        <h5>John Doe</h5>
         <div className="card-image">
          <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5zdGFncmFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>

         </div>
         <div className="card-content">
         <i className="material-icons" style={{color: "red"}}>favorite</i>
          <h6>Post Title</h6>
            <p>welcome to the virtual world</p>
            <input  type = "text" placeholder=" Enter comment"/>
         </div>

      </div>
    </div>
  )
}

export default Home
