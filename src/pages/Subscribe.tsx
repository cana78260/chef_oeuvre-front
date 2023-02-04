import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../components/Bouton";
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
          compte_temps: 2,
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
            setChampManquant("Veuillez remplir tous les champs !");
          } else if (error.response.data.message) {
            setChampManquant(error.response.data.message);
          }
        });
    }
  };
  useEffect(() => {
    console.log("lastName", nameElement);
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
      <div className="subscribe-page  ">
        <section className="container-form-global">
          <div className="container-form-sub ">
            <div className="suscribe ">
              <h1>Inscris-toi gratuitement!</h1>
            </div>
            <form
              method="POST"
              className="suscribeForm "
              onSubmit={submitFonction}
            >
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>

              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              <div className="mb-3">
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
              </div>
              {/* </div>
              <div className="mb-3">
                <label
                  htmlFor="inputPassword2"
                  className="htmlForm-label text-center"
                />
                <input
                  type="password"
                  className="htmlForm-control text-center"
                  id="inputPassword2"
                  placeholder="Confirme le mot de passe"
                  // onChange={passwordFunction2}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputAge"
                  className="htmlForm-label text-center"
                />

                <select
                  name="age"
                  id="inputAge"
                  className="htmlForm-label text-center select" */}
              {/* // onChange={ageFunction}
                  // value={ageState}
                > */}
              {/* <option key={uuidv4()} value="">
                      Sélectionne ton âge{" "}
                    </option>
                    {ageOptions.map((ageOption) => (
                      <option key={uuidv4()} value={ageOption}>
                        {ageOption} ans
                      </option>
                    ))} */}
              {/* </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputWeight" className="htmlForm-label" />

                <select
                  name="weight"
                  id="inputWeight"
                  className="htmlForm-label select" */}
              {/* // value={weightState}
                  // onChange={weightFunction}
                > */}
              {/* <option key={uuidv4()} value="">
                      Sélectionne ton poids
                    </option>
                    {poidsOptions.map((poidsOption) => (
                      <option key={uuidv4()} value={poidsOption}>
                        {poidsOption} kg
                      </option>
                    ))} */}
              {/* </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputHeight" className="htmlForm-label" />

                <select
                  name="height"
                  id="inputHeight"
                  className="htmlForm-label select selectSub" */}
              {/* // value={heightState}
                  // onChange={heightFunction}
                > */}
              {/* <option key={uuidv4()} value="">
                      Sélectionne ta taille
                    </option>
                    {tailleOptions.map((tailleOption) => (
                      <option key={uuidv4()} value={tailleOption}>
                        {tailleOption} m
                      </option>
                    ))} */}
              {/* </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputGender" className="htmlForm-label" />

                <select
                  name="gender"
                  id="inputGender"
                  className="htmlForm-label text-center select selectSub"
                  // value={sexState} */}
              {/* // onChange={sexFunction}
                > */}
              {/* <option key={uuidv4()} value="">
                      Sélectionne ton genre
                    </option>
                    <option key={uuidv4()} value="femme">
                      Femme
                    </option>
                    <option key={uuidv4()} value="homme">
                      Homme
                    </option> */}
              {/* </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputRation" className="htmlForm-label" />

                <select
                  name="ratio"
                  id="inputRatio"
                  className="htmlForm-label text-center select selectSub" */}
              {/* // value={ratioState}
                  // onChange={ratioFunction}
                > */}
              {/* <option
                      className="text-option-activity"
                      key={uuidv4()}
                      value=""
                    >
                      Sélectionne ton activité
                    </option>
                    <option
                      className="text-option-activity"
                      key={uuidv4()}
                      value="1.375"
                    >
                      faible activité physique
                    </option>
                    <option
                      className="text-option-activity"
                      key={uuidv4()}
                      value="1.56"
                    >
                      entraînement 1 à 3 fois par semaine
                    </option>
                    <option
                      className="text-option-activity"
                    //   key={uuidv4()}
                      value="1.64"
                    >
                      entraînement 4 à 6 fois par semaine
                    </option>
                    <option
                      className="text-option-activity"
                    //   key={uuidv4()}
                      value="1.82"
                    >
                      plus de 6 entraînements par semaine
                    </option> */}
              {/* </select> */}

              <span className="messageDynamique">{champManquant}</span>
              <ValidBouton handleClick={submitFonction} />
            </form>
          </div>
        </section>
      </div>
      Inscription
      {/* <Bouton handleClick={SubscribeBoutonEvent} /> */}
    </div>
  );
};

export default Subscribe;
