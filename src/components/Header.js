import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="img-container">
      <div className="home-contents-wrapper">
        <div className="home-text-wrapper">
          {" "}
          <h3>
            Experience a fresh way to <br />
            <span>manage nutrition</span>
          </h3>
        </div>

        <div className="home-btn-wrapper">
          <Link to="/signup" className="btn home-btn">
            Sign Up
          </Link>
        </div>

        <div className="download-icon"></div>
      </div>
    </div>
  );
}

export default Header;
