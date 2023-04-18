import React,{useEffect, useState, useContext} from 'react'
import './profile.css'
import { UserContext } from '../App';

function Profile() {

  const [myposts, setMyposts] = useState([]);
  const {state, dispatch} = useContext(UserContext);
  
  useEffect(()=>{
    fetch("/myposts",{
      method:"get",
      headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response=>response.json())
    .then(function(data){
      console.log(data);
      setMyposts(data.posts);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);

  return (
    <div className="main-container">
      <div className="profile-container">
        <div>
          <img style={{width : "166px", height:"166px", borderRadius:"83px"}} src="https://media.istockphoto.com/id/1392944438/nl/foto/portrait-of-handsome-attractive-positive-curly-haired-indian-or-arabian-guy-wearing-white.jpg?s=612x612&w=0&k=20&c=PpDoDdF1_3Jo8WDJsv2CYibbAwHdxzjX_v3mClz2nbQ="/>
        </div>
        <div className="details-section">
          <h4>{state ?state.fullName : "Loading.."}</h4>
          <div className="followings">
            <h6>19 posts</h6>
            <h6>56 followers</h6>
            <h6>22 following</h6>
            
          </div>
        </div>
      </div>
      <div className="posts">
        {
          myposts.map((post)=>{
            return(
              <img src={post.image} className="post" alt={post.title} key={post._id} />
            )
          })
        }
        {/* <img className="post" src="https://media.istockphoto.com/id/1392944438/nl/foto/portrait-of-handsome-attractive-positive-curly-haired-indian-or-arabian-guy-wearing-white.jpg?s=612x612&w=0&k=20&c=PpDoDdF1_3Jo8WDJsv2CYibbAwHdxzjX_v3mClz2nbQ="/> */}
      </div>
    </div>
  )
}

export default Profile
