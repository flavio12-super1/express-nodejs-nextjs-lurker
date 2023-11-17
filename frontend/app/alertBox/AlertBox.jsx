import React from "react";
import "./AlertBox.css";

export default function Home({ errorMessage }) {
  return (
    <div className="container">
      <div className="box">
        <div className="content">{errorMessage}</div>
      </div>
      <div className="diamond-container">
        <div className="diamond"></div>
        <div className="secondary-diamond"></div>
      </div>
    </div>
  );
}
