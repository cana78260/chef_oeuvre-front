import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import "./ResetPassword.css";
import axios from 'axios';
import ValidBouton from '../components/ValidBouton';


export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}
const ResetPassword = () => {
const [passwordState, setPasswordState] = useState<string>();
const [passwordState2, setPasswordState2] = useState<string>();
const [UserProfileId, setUserProfileId] = useState<string>();
const [showState, setShowState] = useState<boolean>(false);
const [message, setMessage] = useState<string>();
const navigate = useNavigate();
const location = useLocation();
// utilisation des query params pour recuperer le token dans l'url
let queryParam = new URLSearchParams(location.search);
let recupToken = queryParam.get("token");
console.log("token récuperé dans l' url via les query params", recupToken);
const tokenExpiration = (token: string | null) => {
  if (recupToken) {
    const decoded: PayloadToken = jwt_decode(recupToken);
    if (Date.now() <= decoded.exp * 1000) {
      return true;
    } else {
      return false;
    }
  }
};

let tokenValidator: boolean | undefined = tokenExpiration(recupToken);
console.log("le token est il encore valide:", tokenValidator);

// Mise à jour des infos de l'utilisateur
const passwordFunction1 = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPasswordState(e.currentTarget.value);
};
const passwordFunction2 = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPasswordState2(e.currentTarget.value);
};
const submitFunction = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("cliké");
  console.log("password dans le state 1", passwordState);
  console.log("password dans le state 2", passwordState2);
  // fonction de verification du mot de passe
  if (passwordState !== passwordState2) {
    setMessage("Les mots de passe ne correspondent pas.");
  } else if (tokenValidator !== true) {
    setMessage("Votre demande à expiré");
  } else {
    axios
      .patch(`http://localhost:8080/api/users/reset/password`, {
        password: passwordState,
        token: recupToken,
      })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          navigate("/connexion");
        }, 1000);
        setMessage("Modifications sauvegardées !");
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
          console.log("message:::::::::::", message);
  }
};
return (
  <div>
   
      
        <h1 className="titleModif">Modification mot de passe</h1>

        {/* <form
          id="mb-3"
          method="POST"
          className="ProfilActuel"
          onSubmit={submitFunction}
        >
          <div id="mb-3" className="mb-3">
            <label htmlFor="inputPassword" className="htmlForm-label" />
            <input
              type={showState ? "text" : "password"}
              className="ProfilActuel"
              id="inputPassword"
              placeholder="Nouveau mot de passe"
              onChange={passwordFunction1}
            />
          </div>

          <div id="mb-3" className="mb-3">
            <label htmlFor="inputPassword" className="htmlForm-label" />
            <input
              type={showState ? "text" : "password"}
              className="ProfilActuel"
              id="inputPassword"
              placeholder="Comfirmez mot de passe"
              onChange={passwordFunction2}
            />
          </div>
          <div className="container-check-reset">
            <input
              className="form-check-input "
              type="checkbox"
              id="mdp-afficher"
              name="drone"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                setShowState(e.currentTarget.checked);
                console.log("valeur de la checkbox", e.currentTarget.checked);
              }}
              // defaultChecked={user.role.label === "user" ? true : false}
            />
            <label className="label-reset" htmlFor="mdp-afficher">
              Afficher le mot de passe
            </label>
          </div>

          <p className="message">{message}</p>
          <div className="button">
            <button id="button-mb-3" className="btn btn-danger btn-sm m-1">
              modifier
            </button>
          </div>
        </form> */}
        <div className="container-form-modifPassword">
          <div className="container w-75 modifPassword">
            <div className="form-floating mb-3 modifPassword">
              <input
                type={showState ? "text" : "password"}
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={passwordFunction1}
              />
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            <div className="form-floating mb-3 Inscription">
              <input
                name="passwordConfirm"
                type={showState ? "text" : "password"}
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Password"
                onChange={passwordFunction2}
              />
              <label htmlFor="floatingConfirmPassword">
                Confirmez mot de passe
              </label>
            </div>
            <div className="container-check-reset">
              <input
                className="form-check-input "
                type="checkbox"
                id="mdp-afficher"
                name="drone"
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  setShowState(e.currentTarget.checked);
                  console.log("valeur de la checkbox", e.currentTarget.checked);
                }}
                // defaultChecked={user.role.label === "user" ? true : false}
              />
              <label className="label-reset" htmlFor="mdp-afficher">
                Afficher le mot de passe
              </label>
            </div>

            <p className="message">{message}</p>
          </div>
        </div>
      
      <div className="container w-50">
        <ValidBouton handleClick={submitFunction} />
      </div>
    </div>
 
);
};

export default ResetPassword;