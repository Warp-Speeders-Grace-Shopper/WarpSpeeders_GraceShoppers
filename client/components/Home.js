import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { username } = useSelector((state) => state.auth);
  return (
    <div>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

export default Home;
