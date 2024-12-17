import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App';
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([]);//initialising empty array
  const { state } = useContext(UserContext);
  const url = process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    fetch(url + "/posts", {
      method: "get",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(function (data) {
        console.log(data);
        var postArray = data.posts.reverse();
        setPosts(postArray);

      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);//load only once when component is mounting/loading

  const likeUnlike = (postId, url1) => {
    fetch(url+ url1, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ postId: postId })
    })
      .then(response => response.json())
      .then(function (updatedPost) {
        const newPostArr = posts.map((oldPost) => {
          if (oldPost._id === updatedPost._id) {
            return updatedPost;
          }

          else {
            return oldPost;
          }
        })
        console.log(newPostArr)
        setPosts(newPostArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const submitComment = (event, postId) => {
    event.preventDefault(); // Avoid page refresh
    const commentText = event.target[0].value;
  
    console.log("Form Submitted:", commentText, "Post ID:", postId);
  
    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User is not logged in.");
      alert("User not logged in. Please login to comment.");
      return;
    }
  
    fetch(url +"/comment", {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentText: commentText, postId: postId })
    })
      .then(response => {
        console.log("Response Status:", response.status);
        if (!response.ok) {
          throw new Error(`Failed to add comment. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(updatedPost => {
        console.log("Updated Post from Server:", updatedPost);
  
        // Update the posts array with the new comment
        const newPostArr = posts.map(oldPost => 
          oldPost._id === updatedPost._id ? updatedPost : oldPost
        );
  
        console.log("New Post Array:", newPostArr);
        setPosts(newPostArr);
        event.target[0].value = ""; // Clear input field after success
      })
      .catch(error => {
        console.error("Error adding comment:", error.message);
        alert("Failed to add comment. Please try again.");
      });
  };
  

  const deletePost = (postId) => {

    fetch(url + `/deletepost/${postId}`, {
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
        posts.map((post, key) => {
          return (
            <div className="card home-card" key={key}>
              <h5 style={{ padding: "10px" }}>
                {post.author.fullName} <br />

                {post.author._id === state._id
                  && <i onClick={() => deletePost(post._id)}
                    style={{ color: "red", cursor: "pointer", float: "right", fontSize: "34px" }}
                    className="material-icons">delete_forever</i>}
                <h6 style={{ fontWeight: "500", marginRight: "10px" }}>{post.title}</h6>
              </h5>

              <div className="card-image">
                <img src={post.image} alt='post_image' />

              </div>
              <div className="card-content">
                <div >
                  <div className="likesection">
                    {/* <i className="material-icons" style={{color: "#d32f2f" , marginRight:"10px" } }>favorite</i> */}
                    {
                      post.likes.includes(state._id)
                        ? <i onClick={() => likeUnlike(post._id, '/unlike')} className="material-icons" style={{ color: "#d32f2f", cursor: "pointer" }}>thumb_down</i>
                        :
                        <i onClick={() => likeUnlike(post._id, '/like')} className="material-icons" style={{ color: "hwb(240 10% 0%)", marginRight: "10px", cursor: "pointer" }}>thumb_up</i>
                    }


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
                    post.comments.length > 0 ?
                      <h6 style={{
                        fontWeight: "600"
                      }}>Comments </h6> : " "
                  }

                  {
                    post.comments.map((comment, key) => {
                      return (
                        <h6 key={key} className="comm">
                          <span style={{
                            fontWeight: "400",
                            fontSize: "13px",
                            marginRight: "10px"
                          }}>{comment.commentedBy.fullName} : </span>
                          <span style={{
                            fontWeight: "50",
                            fontSize: "13px", marginRight: "10px"
                          }}>{comment.commentText}</span>
                        </h6>)
                    })
                  }
                </div>

                <form
                  className="form-class"
                  onSubmit={(event) => {
                    submitComment(event, post._id);
                  }}
                >
                  <input type="text" placeholder="Enter comment" required />
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
