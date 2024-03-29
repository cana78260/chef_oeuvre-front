import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import "./Subscribe.css";

const Subscribe = () => {
  const [champManquant, setChampManquant] = useState<string>();
  const nameElement = useRef<HTMLInputElement>(null);
  const prenomElement = useRef<HTMLInputElement>(null);
  const pseudoElement = useRef<HTMLInputElement>(null);
  const ageElement = useRef<HTMLInputElement>(null);
  const genreElement = useRef<HTMLInputElement>(null);
  const adressElement = useRef<HTMLInputElement>(null);
  const villeElement = useRef<HTMLInputElement>(null);
  const departementElement = useRef<HTMLInputElement>(null);
  const [mailState, setMailState] = useState<string>();
  const passwordElement = useRef<HTMLInputElement>(null);
  const confirmPasswordElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const mailFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMailState(
      e.currentTarget.value
        .toLocaleLowerCase()
        .trim()
        .split(" ")
        .join("")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
      // normalize et replace pour les accent et autres le reste pour les espaces
    );
  };

  const submitFonction = (e: FormEvent) => {
    e.preventDefault();

    if (
      passwordElement.current?.value !== confirmPasswordElement.current?.value
    ) {
      alert("Les champs mot de passe et confirmation ne correspondent pas.");
    } else {
      axios
        .post("http://localhost:8080/api/auth/register", {
          nom: nameElement.current?.value,
          prenom: prenomElement.current?.value,
          pseudo: pseudoElement.current?.value,
          age: Number(ageElement.current?.value),
          genre: genreElement.current?.value,
          adresse: adressElement.current?.value,
          ville: villeElement.current?.value,
          departement: departementElement.current?.value,
          mail: mailState,
          mot_de_passe: passwordElement.current?.value,
          compte_temps: 120,
        })
        .then((res) => {
          console.log("le console.log du response.data", res.data);

          return navigate("/connexion");
        })
        .catch((error) => {
          console.error("something went wrong", error);
          if (
            !nameElement ||
            !prenomElement ||
            !pseudoElement ||
            !ageElement ||
            !genreElement ||
            !adressElement ||
            !villeElement ||
            !departementElement ||
            !mailState ||
            passwordElement
          ) {
            setChampManquant(error.response.data.message);
          }
        });
    }
  };
  useEffect(() => {
    console.log("lastName!", nameElement);
    console.log("firstName", prenomElement);
    console.log("mail", mailState);
    console.log("age dans useEffect", ageElement);
    console.log("password", passwordElement);
    console.log("password2", confirmPasswordElement);
    console.log("weight", adressElement);
    console.log("height", villeElement);
    console.log("sex", departementElement);
    console.log("ratio", pseudoElement);
  });

  return (
    <div>
      <h1 className="title-subscribe">Inscription</h1>
      <div className="container-form-inscription">
        <div className="container w-75 inscription">
          <div className="form-floating mb-3 inscription">
            <input
              name="nom"
              type="nom"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={nameElement}
            />
            <label htmlFor="floatingInput">Nom</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="prénom"
              type="prénom"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={prenomElement}
            />
            <label htmlFor="floatingInput">prénom</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="pseudo"
              type="pseudo"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={pseudoElement}
            />
            <label htmlFor="floatingInput">Pseudo</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="age"
              type="age"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={ageElement}
            />
            <label htmlFor="floatingInput">Age</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="genre"
              type="genre"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={genreElement}
            />
            <label htmlFor="floatingInput">Genre</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="adresse"
              type="adresse"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={adressElement}
            />
            <label htmlFor="floatingInput">adresse</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="ville"
              type="ville"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={villeElement}
            />
            <label htmlFor="floatingInput">Ville</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="departement"
              type="departement"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={departementElement}
            />
            <label htmlFor="floatingInput">Département</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="mail"
              type="mail"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={mailFunction}
            />
            <label htmlFor="floatingInput">adresse mail</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              ref={passwordElement}
            />
            <label htmlFor="floatingPassword">Mot de passe</label>
          </div>
          <div className="form-floating mb-3 Inscription">
            <input
              name="passwordConfirm"
              type="password"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Password"
              ref={confirmPasswordElement}
            />
            <label htmlFor="floatingConfirmPassword">
              Confirmez mot de passe
            </label>
          </div>
          <div className="SubmitInscription"></div>
          <span className="messageDynamique">{champManquant}</span>
        </div>
      </div>
      <div className="container w-50">
        <ValidBouton handleClick={submitFonction} />
      </div>
    </div>
  );
};

export default Subscribe;
