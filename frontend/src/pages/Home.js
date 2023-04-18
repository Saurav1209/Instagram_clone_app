import React,{useState,useEffect} from 'react'
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([]);//initialising empty array
  useEffect(()=>{
      fetch("/posts",{
        method:"get",
        headers : {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response=>response.json())
      .then(function(data){
        console.log(data);
        setPosts(data.posts);
      })
      .catch((error)=>{
        console.log(error);
      });
  },[]);//load only once when component is mounting/loading
  return (
    <div className="home-container">
        {
            posts.map((post)=>{
              return(
                <div className="card home-card" key={post._id}>
                  <h5 style={{padding:"10px"}}>{post.author.fullName}</h5>
                    <div className="card-image">
                    <img src={post.image}/>
      
                    </div>
                    <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>{post.title}</h6>
                      <p>{post.body}</p>
                      <input  type = "text" placeholder=" Enter comment"/>
                    </div>
                </div>
              )
            })
        }  
    </div>
  )
}

export default Home
