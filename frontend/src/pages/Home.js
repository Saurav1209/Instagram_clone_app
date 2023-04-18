import React,{useState,useEffect} from 'react'
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([]);//initialising empty array
  useEffect(()=>{
      
    
  },[]);//load only once when component is mounting/loading
  return (
    <div className="home-container">
      <div className="card home-card">
        <h5 style={{padding:"10px"}}>John Doe</h5>
         <div className="card-image">
          <img src="https://media.istockphoto.com/id/1392944438/nl/foto/portrait-of-handsome-attractive-positive-curly-haired-indian-or-arabian-guy-wearing-white.jpg?s=612x612&w=0&k=20&c=PpDoDdF1_3Jo8WDJsv2CYibbAwHdxzjX_v3mClz2nbQ="/>

         </div>
         <div className="card-content">
         <i className="material-icons" style={{color: "red"}}>favorite</i>
          <h6>Post Title</h6>
            <p>welcome to the virtual world</p>
            <input  type = "text" placeholder=" Enter comment"/>
         </div>

      </div>
      <div className="card home-card">
        <h5 style={{padding:"10px"}}>John Doe</h5>
         <div className="card-image">
          <img src="https://media.istockphoto.com/id/1392944438/nl/foto/portrait-of-handsome-attractive-positive-curly-haired-indian-or-arabian-guy-wearing-white.jpg?s=612x612&w=0&k=20&c=PpDoDdF1_3Jo8WDJsv2CYibbAwHdxzjX_v3mClz2nbQ="/>

         </div>
         <div className="card-content">
         <i className="material-icons" style={{color: "red"}}>favorite</i>
          <h6>Post Title</h6>
            <p>welcome to the virtual world</p>
            <input  type = "text" placeholder=" Enter comment"/>
         </div>

      </div>
      <div className="card home-card">
        <h5 style={{padding:"10px"}}>John Doe</h5>
         <div className="card-image">
          <img src="https://media.istockphoto.com/id/1392944438/nl/foto/portrait-of-handsome-attractive-positive-curly-haired-indian-or-arabian-guy-wearing-white.jpg?s=612x612&w=0&k=20&c=PpDoDdF1_3Jo8WDJsv2CYibbAwHdxzjX_v3mClz2nbQ="/>

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
