import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context.ts/Auth-context";
import jwt_decode from "jwt-decode";
import { PayloadToken } from "../pages/Services";

const Navbar = () => {
  const navigate = useNavigate();
  const [tokenRole, setTokenRole] = useState<string>();
  const { savedToken, validTimeToken, tokenFunction, onAuthChange } =
    useContext(AuthContext);

  console.log("TOKEN ROLE DANS NAVBAR", tokenRole);
  console.log("SAVEEEED TTOKEN", savedToken);
  console.log("validTimeToken TTOKEN", validTimeToken);

  useEffect(() => {
    //onAuthChange(savedToken);
    //tokenFunction(savedToken);
    console.log("voici le resultat pour savedToken", savedToken);
    if (savedToken) {
      const decoded: PayloadToken = jwt_decode(savedToken);
      console.log("le payload", decoded.role);
      setTokenRole(decoded.role);
      console.log("etat d'expiration token dans la navbar", validTimeToken);
    }
    if (validTimeToken === "token expiré") {
      window.location.reload();
    }
  }, [validTimeToken, savedToken]);

  const tokenVerify = (e: SyntheticEvent) => {
    tokenFunction(savedToken);
    console.log("valide time token verify", validTimeToken);
    if (
      !localStorage.getItem("accesstoken") ||
      validTimeToken === "token expiré"
    ) {
      window.location.reload();
    }
  };

  const handleClickDecoBouton = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let monToken = localStorage.getItem("accesstoken");
    console.log("----------etat local storage avant deco", monToken);
    localStorage.removeItem("accesstoken");
    monToken = localStorage.getItem("accesstoken");
    console.log("----------etat local storage apres deco", monToken);
    navigate("/");
    window.location.reload();
  };

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
                  <NavLink to="/welcome" end className="nav-link">
                    Accueil
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
                {(!savedToken && (
                  <>
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
                  </>
                )) || (
                  <>
                    <li className="nav-item">
                      {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                      <NavLink
                        to="main"
                        className="nav-link"
                        onClick={tokenVerify}
                      >
                        Journal de bord
                      </NavLink>
                    </li>
                    {/* <li className="nav-item"> */}
                    {/* <a className='nav-link' href='#'>
                Details
              </a> */}
                    {/* <NavLink to="messagerie" className="nav-link">
                    Messagerie
                  </NavLink>
                </li> */}
                    {tokenRole === "admin" &&
                      tokenFunction(savedToken) && (
                        <li className="nav-item dropdown">
                          <NavLink
                            to="/"
                            className="nav-link buttonStyle  dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={tokenVerify}
                          >
                            <strong
                            // data-bs-toggle="collapse"
                            // data-bs-target="#navbarNav"
                            >
                              {" "}
                              Admin{" "}
                            </strong>
                          </NavLink>
                          <ul className="dropdown-menu">
                            <li>
                              {/* <a className="dropdown-item" href="#">
                            Action
                          </a> */}
                              <NavLink
                                to="/adminServices"
                                className="nav-link buttonStyle "
                                onClick={tokenVerify}
                              >
                                <strong> Gestion des services </strong>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/adminUsers"
                                className="nav-link buttonStyle "
                                onClick={tokenVerify}
                              >
                                <strong> Gestion des utilisateurs</strong>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/adminMessages"
                                className="nav-link buttonStyle "
                                onClick={tokenVerify}
                              >
                                <strong> Gestion des messages </strong>
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/adminCategories"
                                className="nav-link buttonStyle "
                                onClick={tokenVerify}
                              >
                                <strong> Gestion des catégories </strong>
                              </NavLink>
                            </li>
                          </ul>
                        </li>
                      )}
                    <li className="li-deco">
                      <input
                        type="button"
                        value="Déconnexion"
                        id="decoBtn"
                        className="btn btn-success btn-sm "
                        onClick={handleClickDecoBouton}
                      />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
