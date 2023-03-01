import axios from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ValidBouton from '../components/ValidBouton';
import "./ModifCompte.css";
import { User } from './Services';

const ModifCompte = () => {
    const [message, setMessage] = useState<string>();
     const [UserProfile, setUserProfile] = useState<User>();
    const [champManquant, setChampManquant] = useState<string>();
    const [nameElement, setNameElement] = useState<string>();
    const [prenomElement, setPrenomElement] = useState<string>();
    const [pseudoElement, setPseudoElement] = useState<string>();
    const [updateage, setUpdateage] = useState<number>();
    const [genreElement, setGenreElement] = useState<string>();
    const [adressElement, setAdressElement] = useState<string>();
    const [villeElement, setVilleElement] = useState<string>();
    const [departementElement, setDepartementElement] = useState<string>();
    const [mailElement, setMailElement] = useState<string>();
    const [passwordState, setPasswordState] = useState<string>();
    const [passwordState2, setPasswordState2] = useState<string>();
    const [updatePassword, setUpdatePassword] = useState<string>();
  const navigate = useNavigate();
    const params = useParams();


useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("res--------------------------", res.data);
        setUserProfile(res.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
        if (error.response.data.statusCode === 401) {
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  }, []);




     const nameFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let nom = e.currentTarget.value;
      setNameElement(nom);
    };
     const prenomFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let prenom = e.currentTarget.value;
      setPrenomElement(prenom);
    };
     const pseudoFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let pseudo = e.currentTarget.value;
      setPseudoElement(pseudo);
    };
     const ageFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
       let age = Number(e.currentTarget.value);
       setUpdateage(age);
     };
     const departementFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let departement = e.currentTarget.value;
      setDepartementElement(departement);
    };
     const genreFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let genre = e.currentTarget.value;
      setGenreElement(genre);
    };
      const adressFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let adresse = e.currentTarget.value;
      setAdressElement(adresse);
    };
    
     const villeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let ville = e.currentTarget.value;
      setVilleElement(ville);
    };
     const mailFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      let mail = e.currentTarget.value;
      setMailElement(mail);
    };
     const passwordFunction1 = (e: React.ChangeEvent<HTMLInputElement>) => {
       setUpdatePassword(e.currentTarget.value);
     };
     const passwordFunction2 = (e: React.ChangeEvent<HTMLInputElement>) => {
       setUpdatePassword(e.currentTarget.value);
     };
 

  
 

    const submitFonction = (e: FormEvent) => {
      e.preventDefault();
// if (mdp1Element !== mdp2Element) {
//   alert("Les mots de passe ne correspondent pas.");4
// } else {const formData = {
//         nom: nameElement,
//         prenom: prenomElement,
//         pseudo: pseudoElement,
//         age: updateage,
//         genre: genreElement,
//         adresse: adressElement,
//         ville: villeElement,
//         departement: departementElement,
//         mail: mailElement,
//        mot_de_passe:
//       };


//       if(mdp1Element&&mdp2Element){
//         formData.mot_de_passe = mdp1Element
//       }
//     }
    //  mot_de_passe:mdp1Element,
      // const formData = {
      //   nom: nameElement,
      //   prenom: prenomElement,
      //   pseudo: pseudoElement,
      //   age: updateage,
      //   genre: genreElement,
      //   adresse: adressElement,
      //   ville: villeElement,
      //   departement: departementElement,
      //   mail: mailElement,
      //   mot_de_passe:mdp1Element,
      // };

      // const data: any = {};
      // for (const [key, value] of Object.entries(formData)) {
      //   if (value !== "") {
      //     data[key] = value;
      //   }
      // }

      // console.log("DAAAAATAAAA,", data);

    // if(mdp1Element!==undefined||mdp2Element!==undefined){}
    
      if (passwordState !== passwordState2) {
        alert("Les mots de passe ne correspondent pas.");
      } else {
        axios
          .patch(
            `http://localhost:8080/api/users/${params.id}`,
            {
              nom: nameElement,
              prenom: prenomElement,
              pseudo: pseudoElement,
              age: updateage,
              genre: genreElement,
              adresse: adressElement,
              ville: villeElement,
              departement: departementElement,
              mail: mailElement,
              mot_de_passe: updatePassword,
            },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
              },
            }
          )
          .then((res) => {
            setTimeout(() => {
              navigate("/main");
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
      }
    
    };
    
    return (
      <div>
        <div className="titreModifUtilisateur">
          <h3>Modifiez votre compte</h3>
        </div>

        {/* <div className="subscribe-page  ">
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
                    // style={{ marginRight: "10px" }}
                  />
                  <input
                    type="nom"
                    className="htmlForm-control text-center "
                    id="inputNom"
                    placeholder={UserProfile?.nom}
                    onChange={nameFunction}
                    value={nameElement}
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
                    placeholder={UserProfile?.prenom}
                    onChange={prenomFunction}
                    value={prenomElement}
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
                    placeholder={UserProfile?.pseudo}
                    onChange={pseudoFunction}
                    value={pseudoElement}
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
                    placeholder={UserProfile?.age.toString()}
                    // value={ageElement}
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
                    placeholder={UserProfile?.genre}
                    onChange={genreFunction}
                    value={genreElement}
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
                    placeholder={UserProfile?.adresse}
                    onChange={adressFunction}
                    value={adressElement}
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
                    placeholder={UserProfile?.ville}
                    onChange={villeFunction}
                    value={villeElement}
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
                    placeholder={UserProfile?.departement}
                    onChange={departementFunction}
                    value={departementElement}
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
                    placeholder={UserProfile?.mail}
                    onChange={mailFunction}
                    value={mailElement}
                  />
                </div>{" "}
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="htmlForm-label text-center"
                  />
                  <input
                    type="password"
                    className="htmlForm-control text-center "
                    id="password" */}
        {/* // value={UserProfile?.id}
                    placeholder="Nouveau mot de passe"
                    onChange={passwordFunction1}
                    // value={mdp1Element} */}
        {/* /> */}
        {/* </div>
                <div className="mb-3">
                  <label
                    htmlFor="inputmdp2"
                    className="htmlForm-label text-center"
                  />
                  <input
                    type="password"
                    className="htmlForm-control text-center "
                    id="inputmdp2"
                    placeholder="Confirmez votre mot de passe"
                    onChange={passwordFunction2}
                    // value={UserProfile?.id}
                    // value={mdp2Element}
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
        </div> */}

        {/* ---------------------------------------------------------------------- */}
        <div className="container-form-modification">
          <div className="container w-75 modification">
            <div className="form-floating mb-3 modification">
              <input
                name="nom"
                type="nom"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.nom}
                onChange={nameFunction}
                value={nameElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.nom}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="prénom"
                type="prénom"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.prenom}
                onChange={prenomFunction}
                value={prenomElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.prenom}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="pseudo"
                type="pseudo"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.pseudo}
                onChange={pseudoFunction}
                value={pseudoElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.pseudo}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="age"
                type="age"
                className="form-control"
                placeholder={UserProfile?.age.toString()}
                // value={ageElement}
                onChange={ageFunction}
                value={updateage}
              />
              <label htmlFor="floatingInput">{UserProfile?.age}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="genre"
                type="genre"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.genre}
                onChange={genreFunction}
                value={genreElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.genre}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="adresse"
                type="adresse"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.adresse}
                onChange={adressFunction}
                value={adressElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.adresse}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="ville"
                type="ville"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.ville}
                onChange={villeFunction}
                value={villeElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.ville}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="departement"
                type="departement"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.departement}
                onChange={departementFunction}
                value={departementElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.departement}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="mail"
                type="mail"
                className="form-control"
                id="floatingInput"
                placeholder={UserProfile?.mail}
                onChange={mailFunction}
                value={mailElement}
              />
              <label htmlFor="floatingInput">{UserProfile?.mail}</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="password"
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Nouveau mot de passe"
                onChange={passwordFunction1}
              />
              <label htmlFor="floatingPassword">Mot de passe</label>
            </div>
            <div className="form-floating mb-3 modification">
              <input
                name="passwordConfirm"
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Confirmez votre mot de passe"
                onChange={passwordFunction2}
              />
              <label htmlFor="floatingConfirmPassword">
                Confirmez mot de passe
              </label>
            </div>
            <div className="SubmitModification"></div>
            {/* <span className="messageConnexion">{message}</span> */}
          </div>
        </div>
        <div className="container w-50">
          <span className="messageDynamique">{champManquant}</span>
          <ValidBouton handleClick={submitFonction} />
          {/* <ValidBouton handleClick={handleLoginForm} /> */}
        </div>
      </div>
    );
};

export default ModifCompte;