import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProfileCard = ({location}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src="https://i.pinimg.com/originals/fb/c2/a9/fbc2a961bfd0e7b5673a7922cb848cdb.jpg"
        // {
        //     user.coverPicture
        //       ? serverPublic + user.coverPicture
        //       : serverPublic + "defaultCover.jpg"
        //   }
           alt="CoverImage" />

         
        <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Vdj-q0IGnxV12VmznzlGHcVc0HnU656R8nPOeN4SsUY8YJp4kM0Ze8-pyuffNW7JmLI&usqp=CAU"
          // {
          //   user.profilePicture
          //     ? serverPublic + user.profilePicture
          //     : serverPublic + "defaultProfile.png"
          // }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
