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
  const mailElement = useRef<HTMLInputElement>(null);
  const passwordElement = useRef<HTMLInputElement>(null);
  const confirmPasswordElement = useRef<HTMLInputElement>(null);
   const navigate = useNavigate();

  const submitFonction = (e: FormEvent) => {
    e.preventDefault();
    console.log("bouton cliqué");
    // console.log(nameElement.current?.value);
    // console.log(prenomElement.current?.value);
    // console.log(pseudoElement.current?.value);
    // console.log(ageElement.current?.value);
    // console.log(adressElement.current?.value);
    // console.log(villeElement.current?.value);
    // console.log(departementElement.current?.value);
    // console.log(mailElement.current?.value);
    // console.log(passwordElement.current?.value);
    //  console.log(confirmPasswordElement.current?.value);
    if (passwordElement.current?.value !== confirmPasswordElement.current?.value) {
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
          mail: mailElement.current?.value,
          mot_de_passe: passwordElement.current?.value,
          compte_temps: 120,
        })
        .then((res) => {
          console.log("le console.log du response.data", res.data);
          //   let inscription = true;
          //   if (inscription) {
          return navigate("/connexion");
          //   }
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
            !mailElement ||
            passwordElement
          ) {
            setChampManquant(error.response.data.message);
          // } else if (error.response.data.message) {
          //   console.log(
          //     "error.response.data.message////////////////////",
          //     error.response.data.message
          //   );
          //   setChampManquant(error.response.data.message);
          }
        });
    }
  };
  useEffect(() => {
    console.log("lastName!", nameElement);
    console.log("firstName", prenomElement);
    console.log("mail", mailElement);
    console.log("age dans useEffect", ageElement);
    console.log("password", passwordElement);
    console.log("password2", confirmPasswordElement);
    console.log("weight", adressElement);
    console.log("height", villeElement);
    console.log("sex", departementElement);
    console.log("ratio", pseudoElement);
  });

//   const SubscribeBoutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
//     console.log("page subscribe");
//   };

  return (
    <div>
      {/* <div className="subscribe-page  ">
        <section className="container-form-global"> */}
      {/* <div className="container-form-sub "> */}
      {/* <div className="suscribe ">
              <h1>Inscris-toi gratuitement!</h1>
            </div>
            <form
              method="POST"
              className="suscribeForm "
              onSubmit={submitFonction}
            > */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputNom"
                  className="htmlForm-label text-center"
                />{" "}
                <input
                  type="nom"
                  className="htmlForm-control text-center "
                  id="inputNom"
                  placeholder="Nom"
                  ref={nameElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputPrenom"
                  className="htmlForm-label text-center"
                />
                <input
                  type="prenom"
                  className="htmlForm-control text-center"
                  id="inputPrenom"
                  placeholder="Prénom"
                  ref={prenomElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputPseudo"
                  className="htmlForm-label text-center"
                />
                <input
                  type="pseudo"
                  className="htmlForm-control text-center"
                  id="inputPseudo"
                  placeholder="Pseudo"
                  ref={pseudoElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputAge"
                  className="htmlForm-label text-center"
                />
                <input
                  type="Age"
                  className="htmlForm-control text-center"
                  id="inputAge"
                  placeholder="Age"
                  ref={ageElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputGenre"
                  className="htmlForm-label text-center"
                />
                <input
                  type="Genre"
                  className="htmlForm-control text-center"
                  id="inputGenre"
                  placeholder="Genre"
                  ref={genreElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputAdresse"
                  className="htmlForm-label text-center"
                />
                <input
                  type="Adresse"
                  className="htmlForm-control text-center"
                  id="inputAdresse"
                  placeholder="Adresse"
                  ref={adressElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputVille"
                  className="htmlForm-label text-center"
                />
                <input
                  type="Ville"
                  className="htmlForm-control text-center"
                  id="inputVille"
                  placeholder="Ville"
                  ref={villeElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputdepartement"
                  className="htmlForm-label text-center"
                />
                <input
                  type="departement"
                  className="htmlForm-control text-center"
                  id="inputdepartement"
                  placeholder="département"
                  ref={departementElement}
                />
              </div> */}

      {/* <div className="mb-3">
                <label
                  htmlFor="inputMail"
                  className="htmlForm-label text-center "
                />
                <input
                  type="email"
                  className="htmlForm-control text-center"
                  id="exampleInputAge"
                  placeholder="Email"
                  ref={mailElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="inputPassword"
                  className="htmlForm-label text-center"
                />
                <input
                  type="password"
                  className="htmlForm-control text-center"
                  id="inputPassword"
                  placeholder="Mot de passe"
                  ref={passwordElement}
                />
              </div> */}
      {/* <div className="mb-3">
                <label
                  htmlFor="confirmPassword"
                  className="htmlForm-label text-center"
                />
                <input
                  type="password"
                  className="htmlForm-control text-center"
                  id="confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  ref={confirmPasswordElement}
                />
              </div> */}
      {/* <span className="messageDynamique">{champManquant}</span>
              <ValidBouton handleClick={submitFonction} /> */}
      {/* </form>
          </div> */}
      {/* </section>
      </div> */}
      {/* Inscription */}
      {/* <Bouton handleClick={SubscribeBoutonEvent} /> */}
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
              ref={mailElement}
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
          {/* <span className="messageConnexion">{message}</span> */}
          <span className="messageDynamique">{champManquant}</span>
        </div>
      </div>
      <div className="container w-50">
        <ValidBouton handleClick={submitFonction} />
        {/* <ValidBouton handleClick={handleLoginForm} /> */}
      </div>
    </div>
  );
};

export default Subscribe;
