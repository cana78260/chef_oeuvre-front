import React from 'react';
import Footer from '../components/Footer';
import "./Welcome.css";

const Welcome = () => {
    return (
      <div>
        <p>Accueil</p>
        <div className="footer-app">
          <Footer />
        </div>
      </div>
    );
};

export default Welcome;