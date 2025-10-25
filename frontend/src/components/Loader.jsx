// Loader.jsx
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="outer-circle">
        <div className="inner-circle"></div>
      </div>
    </div>
  );
};

export default Loader;
