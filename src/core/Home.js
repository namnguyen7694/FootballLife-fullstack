import React from "react";
import Posts from "../post/Posts";
const Home = () => (
  <div>
    <div className="jumbotron text-center header">
      <h1>Football Life</h1>
      <h3 className="lead">Welcome to Social of Football</h3>
    </div>
    <div className="container">
      <Posts /> 
    </div>
    <div className="jumbotron text-center">
      <h3>Copyright 2019</h3>
      <h4 className="lead">Nguyen Hoai Nam</h4>
    </div>
  </div>
);

export default Home;
