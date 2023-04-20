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
  
  const likeUnlike = (postId, url) =>{
    fetch(url ,{
      method:"put",
      headers : {
        "Content-Type" :"application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body : JSON.stringify({postId : postId})
        
      

    })
    .then(response=>response.json())
    .then(function(updatedPost){
      const newPostArr = posts.map((oldPost)=>{
        if(oldPost._id == updatedPost._id)
        {
          return updatedPost ;
        }
        else{
          return oldPost ;
        }
      })
      console.log(newPostArr)
      setPosts(newPostArr);
    })
    .catch((error)=>{
      console.log(error); 
    });
  }
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
                    <i className="material-icons" style={{color: "red" , marginRight:"10px" } }>favorite</i>
                    <i onClick={() => likeUnlike(post._id, '/like')} className="material-icons" style={{color: "blue", marginRight:"10px", cursor: "pointer"}}>thumb_up</i>
                    <i onClick={() => likeUnlike(post._id, '/unlike')} className="material-icons" style={{color: "red", cursor: "pointer"}}>thumb_down</i>
                    <h6>{post.likes.length} likes</h6>


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
