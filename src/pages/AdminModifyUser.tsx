import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
   const[compteTemps, setCompteTemps] = useState<number>();
 
   const navigate = useNavigate();
   const params = useParams();


 const ageFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
   let valeurConvertieNombre = Number(e.currentTarget.value);
   setUpdateage(valeurConvertieNombre);
 };

 const compteFunction = (e: React.ChangeEvent<HTMLInputElement>) =>{
  let valeurConvertieCompte= Number(e.currentTarget.value);
  setCompteTemps(valeurConvertieCompte);
 }

const submitFonction = (e: FormEvent) => {
  e.preventDefault();

  


const formData = {
  nom: nameElement.current?.value,
  prenom: prenomElement.current?.value,
  pseudo: pseudoElement.current?.value,
  age: updateage,
  // age: Number(ageElement.current?.value),
  genre: genreElement.current?.value,
  adresse: adressElement.current?.value,
  ville: villeElement.current?.value,
  departement: departementElement.current?.value,
  mail: mailElement.current?.value,
  // compte_temps: Number(compteTempsElement.current?.value),
  compte_temps: compteTemps,
};

 const data: any = {};
 for (const [key, value] of Object.entries(formData)) {
   if (value !== "") {
    
     data[key] = value;
   }
 }

 console.log("DAAAAATAAAA,", data);
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

        // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
        console.log(`les service ${params.id} a bien été sucré3333333`);
      })
      .catch((error) => {
        console.error("something went wrong", error);
       
      });
  
};
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
                    // ref={ageElement}
                    onChange={ageFunction}
                    value={updateage}
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
                    htmlFor="inputTemps"
                    className="htmlForm-label text-center"
                  />
                  <input
                    type="Temps"
                    className="htmlForm-control text-center"
                    id="inputTemps"
                    placeholder="Temps"
                    // ref={ageElement}
                    onChange={compteFunction}
                    value={compteTemps}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={submitFonction}
                >
                  Modifier
                </button>
                <span className="message">{message}</span>
              </form>
            </div>
          </section>
        </div>
      </div>
    );
};

export default AdminModifyUser;