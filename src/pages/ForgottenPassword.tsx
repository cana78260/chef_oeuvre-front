import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import { AuthContext } from "../Context.ts/Auth-context";
import "./ForgottenPassword.css";

const ForgottenPassword = () => {

  const [mailState, setMailState] = useState<string>();
  const [message, setMessage] = useState<string | null>(null);




  const mailFunction = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setMailState(e.currentTarget.value);
  };
  const handleLoginForm = async (e: FormEvent) => {
    e.preventDefault();

    console.log("mailState::::::::::::::::::", mailState);

    await axios
      .post("http://localhost:8080/api/users/reset/password", {
        mail: mailState,
      })
      .then((response) => {
        setMessage("Email envoyé !");
      })
      .catch((error) => {
        console.log("connexion impossible", error.response.data.message);
        setMessage("Email inexistant");
      });
  };

  // useEffect pour tester les states car ils sont asynchrones//
  //et affichent avant re-render une première valeur undefined//
  useEffect(() => {
    console.log("mail dans useEffect", mailState);
  });

  return (
    <div>
      <h1 className="mdp-title">Modification du mot de passe</h1>

      <div className="lien-mdp">
        <h3 className="email-info">Entrez votre mail</h3>
        <p>
          Vous allez recevoir un mail contenant{" "}
          <span className="spanFinalise">un lien cliquable</span> pour
          réinitialiser votre mot de passe
        </p>
      </div>

      {message === "Email envoyé !" ? (
        <div className="container-message">
          <p className="resetMessage">{message}</p>
        </div>
      ) : message === "Email inexistant" ? (
        <>
          <div className="container-form-reset">
            <div className="container w-75 reset">
              <div className="form-floating mb-3 reset">
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

              <div className="SubmitReset"></div>
              <span className="messageReset">{message}</span>
            </div>
          </div>
          <div className="container w-50">
            <ValidBouton handleClick={handleLoginForm} />
          </div>
        </>
      ) : (
        <>
          <div className="container-form-reset">
            <div className="container w-75 reset">
              <div className="form-floating mb-3 reset">
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

              <div className="SubmitReset"></div>
              <span className="messageReset">{message}</span>
            </div>
          </div>
          <div className="container w-50">
            <ValidBouton handleClick={handleLoginForm} />
          </div>
        </>
      )}
    </div>
  );
};

export default ForgottenPassword;
