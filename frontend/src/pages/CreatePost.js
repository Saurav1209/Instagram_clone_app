import React , {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import './CreatePost.css';
import M from 'materialize-css'

function CreatePost() {
  const navigate = useNavigate() ;
    const [title, setTitle] = useState("") ;
    const [body, setBody] = useState("") ;
    const [image, setImage] = useState("") ;
    
    useEffect(() => {
        if(image){
          fetch("/createpost",{
            method:"post",
            headers : {
              "Content-Type" : "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
              title : title,
              body :body,
              image:image
            })
          })
          .then(response=>response.json())
          .then(function(data){
            // console.log(data);
            if(data.error){
              M.toast({html : data.error, classes: "#c62828 red darken-3"})
            }
            else{
              M.toast({html : "Post created Successfully", classes: "#388e3c green darken-2"});
              navigate("/login")
            }
          })
          .catch((error)=>{
            console.log(error);
        });
        }
      
        }
    , [image]);

    const submitPost = async ()=> {

      const formData = new FormData() ;
      formData.append("file", image[0]) ;
      formData.append("upload_preset", "insta-app-clone") ;
      formData.append("cloud_name", "drdcsopo2") ;
      await fetch("https://api.cloudinary.com/v1_1/drdcsopo2/image/upload", {
          method: "post", 
          body : formData
      }).then(response =>response.json() )
      .then(data => {
        setImage(data.url);
        console.log(data);
      })
      .catch(error => console.log(error)) ;
      

    }




  return (
    <div className="card create-post-container">
        <input 
             value = { title}
            onChange = {(event) => setTitle(event.target.value)}
            type="text" placeholder="post title"/>
        <input 
            value = {body}
            onChange = {(event) => setBody(event.target.value)}
            type="text" placeholder="post content"/>
        <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
                <span>Upload Post Image</span>
                <input type="file" onChange={(event) => setImage(event.target.files)}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
        </div>
        <button onClick={()=> submitPost()} className="btn waves-effect waves-light btn #64b5f6 blue darken-1">Submit Post</button>
    </div>
  )
}

export default CreatePost