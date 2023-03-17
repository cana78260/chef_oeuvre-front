import React from 'react';
import Footer from '../components/Footer';
import "./Welcome.css";

const Welcome = () => {
    return (
      <div>
        <h1 className="welcomeTitle">Bienvenue sur Fil en Troc</h1>

        <div className="imageContainer">
          <img
            className="welcomeImage"
            src="/assets/welcom2.png"
            alt=""
            style={{ width: "100%" }}
          />
        </div>
        <div className="footer-app">
          <Footer />
        </div>
      </div>
    );
};

export default Welcome;