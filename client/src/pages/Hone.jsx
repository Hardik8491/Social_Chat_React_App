import React from "react";
import PostSide from "../Components/PostSide/PostSide";
import ProfileSide from "../Components/profileSide/ProfileSide";
import RightSide from "../Components/RightSide/RightSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;