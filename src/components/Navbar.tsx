import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  return (
    <div>
      <div className="global-navbar">
        <nav className="navbar sticky-top navbar-expand-lg bg-transparent shadow">
          <div className="container-fluid">
            <NavLink to="welcome" className="navbar-brand p-0 m-0">
              <div className="bg-logo">
                <div className="container-logo">
                  <img
                    src={
                      process.env.PUBLIC_URL + `/assets/logov2_detoure150.png`
                    }
                    alt=""
                  />
                  {/* <a className="navbar-brand" href="#">
                  Fil en Troc
                </a> */}
                </div>
              </div>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <a className='nav-link active' aria-current='page' href='#'>
                Home
              </a> */}
                  <NavLink to="/" end className="nav-link">
                    Accueil
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                  <NavLink to="main" className="nav-link">
                    Journal de bord
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                  <NavLink to="subscribe" className="nav-link">
                    Inscription
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                  <NavLink to="connexion" className="nav-link">
                    Connexion
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                  <NavLink to="services" className="nav-link">
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                  <NavLink to="messagerie" className="nav-link">
                    Messagerie
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                  <NavLink to="adminUser" className="nav-link">
                    Admin
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
