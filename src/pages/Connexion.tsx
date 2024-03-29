import axios from "axios";
import "./Connexion.css";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context.ts/Auth-context";
import ValidBouton from "../components/ValidBouton";
import { Link } from "react-router-dom";

const Connexion = () => {
  const { onAuthChange } = useContext(AuthContext);
  const { savedToken } = useContext(AuthContext);
  const [mailState, setMailState] = useState<string>();
  const [passwordState, setPasswordState] = useState<string>();
  const [message, setMessage] = useState<string>();
  const navigate = useNavigate();

  const mailFunction = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setMailState(e.currentTarget.value);
  };

  const passwordFunction = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPasswordState(e.currentTarget.value);
  };

  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault();

    console.log(mailState);
    console.log(passwordState);
    await axios
      .post("http://localhost:8080/api/auth/login", {
        mail: mailState,
        password: passwordState,
      })
      .then((token) => {
        console.log("*******valeur du token", token.data.access_token);
        const tokens = token.data.access_token;
        localStorage.setItem("accesstoken", tokens);
        // recuperation du token dans le local storage afin de l'utiliser dans les context d'authentification
        // recupToken = localStorage.getItem("accesstoken");
        onAuthChange(tokens);
        setTimeout(() => {
          navigate("/main");
        }, 1000);
        setMessage("Connexion réussie !");
      })
      .catch((error) => {
        console.log("connexion impossible", error);
        if (!mailState || !passwordState) {
          setMessage(error.response.data.message);
        } else if (error.message === "Request failed with status code 401") {
          setMessage("Mot de passe ou adresse mail inconnu(e)");
        }
      });
  };
  // useEffect pour tester les states car ils sont asynchrones//
  //et affichent avant re-render une première valeur undefined//
  useEffect(() => {
    onAuthChange(savedToken);
    console.log("mail dans useEffect", mailState);
    console.log("password dans useEffect", passwordState);
  });

  return (
    <div>
      <h1 className="title-connect">Connexion</h1>
      <div className="container-form-connexion">
        <div className="container w-75 connexion">
          <div className="form-floating mb-3 connexion">
            <input
              name="mail"
              type="mail"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onInput={mailFunction}
            />
            <label htmlFor="floatingInput">adresse mail</label>
          </div>
          <div className="form-floating mb-3 connexion">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onInput={passwordFunction}
            />
            <label htmlFor="floatingPassword">Mot de passe</label>
          </div>
          <div className="SubmitConnexion"></div>
          <span className="messageConnexion">{message}</span>
        </div>
        <Link className="linkSub" to="/forgottenPassword">
          <p className="lienInscription"> Mot de passe oublié ?</p>
        </Link>
        <p id="connexionReussie">{message}</p>
      </div>
      <div className="container w-50">
        <ValidBouton handleClick={handleLoginForm} />
      </div>
    </div>
  );
};

export default Connexion;
