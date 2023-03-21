import "./Footer.css";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center footer">
      <div className="row container-footer">
        <div className=" footer-p">
          <Link className="aPropos" to="/aboutus">
            {" "}
            <p className="texteLien">À propos</p>
          </Link>

          <Link className="aPropos" to="/contact">
            <p className="texteLien">Contact</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
