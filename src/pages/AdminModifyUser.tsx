import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import "./Admin.css";

const AdminModifyUser = () => {
  const [message, setMessage] = useState<string>();
  const [champManquant, setChampManquant] = useState<string>();
  const nameElement = useRef<HTMLInputElement>(null);
  const prenomElement = useRef<HTMLInputElement>(null);
  const pseudoElement = useRef<HTMLInputElement>(null);
  const [updateage, setUpdateage] = useState<number>();
  const genreElement = useRef<HTMLInputElement>(null);
  const adressElement = useRef<HTMLInputElement>(null);
  const villeElement = useRef<HTMLInputElement>(null);
  const departementElement = useRef<HTMLInputElement>(null);
  const mailElement = useRef<HTMLInputElement>(null);
  const [compteTemps, setCompteTemps] = useState<number>();

  const navigate = useNavigate();
  const params = useParams();

  const ageFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valeurConvertieNombre = Number(e.currentTarget.value);
    setUpdateage(valeurConvertieNombre);
  };

  const compteFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valeurConvertieCompte = Number(e.currentTarget.value);
    setCompteTemps(valeurConvertieCompte);
  };

  const submitFonction = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      nom: nameElement.current?.value,
      prenom: prenomElement.current?.value,
      pseudo: pseudoElement.current?.value,
      age: updateage,

      genre: genreElement.current?.value,
      adresse: adressElement.current?.value,
      ville: villeElement.current?.value,
      departement: departementElement.current?.value,
      mail: mailElement.current?.value,

      compte_temps: compteTemps,
    };

    const data: any = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value !== "") {
        data[key] = value;
      }
    }

    axios
      .patch(`http://localhost:8080/api/auth/user/${params.id}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("data.........", data);
        setTimeout(() => {
          navigate("/adminUsers");
        }, 2000);
        setMessage(
          "Vos modifications ont bien été prises en compte, merci pour tout! "
        );
      })
      .catch((error) => {
        console.error("something went wrong", error);
      });
  };
  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/assets/admin.png"} alt="" />
      <div className="AdminTitreModifUtilisateur ">
        <h1>Modification Compte utlisateur</h1>
      </div>
      <div className="container-form-modification">
        <div className="container w-75 modification">
          <div className="form-floating mb-3 modification">
            <input
              name="nom"
              type="nom"
              className="form-control"
              id="floatingInput"
              placeholder="Nom"
              ref={nameElement}
            />
            <label htmlFor="floatingInput">Nom</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="prénom"
              type="prénom"
              className="form-control"
              id="floatingInput"
              placeholder="Prénom"
              ref={prenomElement}
            />
            <label htmlFor="floatingInput">Prénom</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="pseudo"
              type="pseudo"
              className="form-control"
              id="floatingInput"
              placeholder="Pseudo"
              ref={pseudoElement}
            />
            <label htmlFor="floatingInput">Pseudo</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="age"
              type="age"
              className="form-control"
              placeholder="Age"
              onChange={ageFunction}
              value={updateage}
            />
            <label htmlFor="floatingInput">Age</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="genre"
              type="genre"
              className="form-control"
              id="floatingInput"
              placeholder="Genre"
              ref={genreElement}
            />
            <label htmlFor="floatingInput">Genre</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="adresse"
              type="adresse"
              className="form-control"
              id="floatingInput"
              placeholder="Adresse"
              ref={adressElement}
            />
            <label htmlFor="floatingInput">Adresse</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="ville"
              type="ville"
              className="form-control"
              id="floatingInput"
              placeholder="Ville"
              ref={villeElement}
            />
            <label htmlFor="floatingInput">ville</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="departement"
              type="departement"
              className="form-control"
              id="floatingInput"
              placeholder="département"
              ref={departementElement}
            />
            <label htmlFor="floatingInput">Département</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="mail"
              type="mail"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              ref={mailElement}
            />
            <label htmlFor="floatingInput">Adresse mail</label>
          </div>
          <div className="form-floating mb-3 modification">
            <input
              name="compteTemps"
              type="text"
              className="form-control"
              id="floatingCompteTemps"
              placeholder="Compte temps"
              onChange={compteFunction}
              value={compteTemps}
            />
            <label htmlFor="floatingCompteTemps">Compte temps</label>
          </div>

          <div className="SubmitModification"></div>
        </div>
      </div>
      <div className="container w-50">
        <span className="messageDynamique">{champManquant}</span>
        <ValidBouton handleClick={submitFonction} />
      </div>
    </div>
  );
};

export default AdminModifyUser;
