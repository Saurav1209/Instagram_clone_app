import React,{useState, useEffect, useContext} from 'react'
import { UserContext } from '../App';
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([]);//initialising empty array
  const { state, dispatch } = useContext(UserContext);
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
        var postArray= data.posts.reverse();
        setPosts(postArray);
        
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

  const submitComment = (event, postId) =>{
    event.preventDefault(); //avoid page refresh
    const commentText = event.target[0].value;
    fetch("/comment" ,{
      method:"put",
      headers : {
        "Content-Type" :"application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body : JSON.stringify({commentText:commentText , postId : postId})
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

  const deletePost = (postId) => {

    fetch(`/deletepost/${postId}`, {
        method: "delete",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },

    })
        .then(response => response.json())
        .then(function (deletedPost) {
            console.log("deletedPost = ", deletedPost);
            const newPostArr = posts.filter((oldPost) => {
                // console.log(oldPost._id+" "+deletedPost._id)
                // console.log(oldPost._id !== deletedPost._id)
                return oldPost._id !== deletedPost.post._id //return the post whose id dont match the deleted id
            });
            console.log(newPostArr);
            setPosts(newPostArr);
        }).catch(error => {
            console.log(error);
        });
  }

  return (
    <div className="home-container">
        {
            posts.map((post,key)=>{
              return(
                <div className="card home-card" key={key}>
                    <h5 style={{paddingLeft:"20px"}}>
                      {post.author.fullName} 
                      {post.author._id == state._id
                                    && <i onClick={() => deletePost(post._id)}
                                        style={{ color: "red", cursor: "pointer",marginRight:"10px", float: "right", fontSize: "34px" }}
                                        className="material-icons">delete_forever</i>}</h5> 
                      <h6 style={{ fontWeight:"500",paddingLeft:"20px",marginTop:"10px", marginRight:"10px"}}>{post.title}</h6>
                    {/* </h5> */}
                    
                    <div className="card-image">
                    <img src={post.image} style={{paddingLeft:"20px",paddingRight:"20px",marginTop:"10px", marginRight:"10px"}}/>
      
                    </div>
                    <div className="card-content">
                    <div >
                      <div className="likesection">
                        {/* <i className="material-icons" style={{color: "#d32f2f" , marginRight:"10px" } }>favorite</i> */}
                        {
                          post.likes.includes(state._id)
                          ?<i onClick={() => likeUnlike(post._id, '/unlike')} className="material-icons" style={{color: "#d32f2f",marginRight:"5px", cursor: "pointer"}}>favorite</i>
                          :
                          <i onClick={() => likeUnlike(post._id, '/like')} className="material-icons" style= {{color:"white" , marginRight:"5px", cursor: "pointer"}}>favorite_border</i>
                        }
                          {/* blue color : "hwb(240 10% 0%)" */}
                          
                       </div>
                       <div>
                       <h6>{post.likes.length} likes</h6> 
                       </div>
                    </div>
                    
                    {/* <h6 style={{ fontWeight:"500", marginRight:"10px"}}>{post.title}</h6> */}
                    {/* <h5 style={{padding:"10px"}}> */}
                    <p>{post.author.fullName} : {post.body}</p>  
                    <p></p>
                    {/* </h5> */}
                    <div className="commentsection">
                      {
                        post.comments.length >0 ?
                        <h6 style={{ 
                          fontWeight:"600"}}>Comments </h6> : " "
                      }
                      
                      {
                        post.comments.map((comment) =>{
                          return (
                          <h6 key={post._id} className="comm">
                            <span style={{ fontWeight:"400",
                            fontSize:"13px" ,
                            marginRight:"10px"}}>{comment.commentedBy.fullName} : </span>
                            <span style={{ fontWeight:"50",
                            fontSize:"13px" , marginRight:"10px"}}>{comment.commentText}</span>
                          </h6>)
                        })
                      }
                    </div>
                      
                      <form className="form-class" onSubmit={(event)=>{submitComment(event, post._id)}}>
                        <input  type = "text" placeholder=" Enter comment"/>
                      </form>
                      
                    </div>
                </div>
              )
            })
        }  
    </div>
  )
}

export default Home
