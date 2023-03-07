import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../components/Bouton";
import CardClient from "../components/CardClient";
import CardFinalise from "../components/CardFinalise";
import "./Main.css";
import   { Category, PayloadToken, User } from "./Services";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context.ts/Auth-context";
import jwt_Decode from "jwt-decode";
import SubmitBouton from "../components/SubmitBouton";



export interface Services {
  id: string;
  titre: string;
  localisation: string;
  departement: string;
  creation: string;
  echeance: string;
  note: number;
  libelle: string;
  createur: User;
  client: User;
  categorie: Category;
}


let mesServices:Services[] = [];
let mesServicesClient: Services[] = [];
let monCompteTemps: Services;

const Main = () => {

  const [cardDisplay, setCardDisplay] = useState<Services[]>([...mesServices])
  const [cardClientDisplay, setCardClientDisplay] = useState<Services[]>([...mesServicesClient]);
  const [compteTempsDisplay, setCompteTempsDisplay] = useState<Services>()
  const { savedToken, validTimeToken, tokenFunction, onAuthChange } =
    useContext(AuthContext);
    const [tokenRole, setTokenRole] = useState<string>();
const [message, setMessage] = useState<string>();
  useEffect(()=>{
    onAuthChange(savedToken);
    tokenFunction(savedToken);
    console.log("voici le resultat pour savedToken dans main.tsx", savedToken);
    if (savedToken) {
      const decoded: PayloadToken = jwt_Decode(savedToken);
      console.log("le payload dans main.tsx", decoded.id);
      setTokenRole(decoded.id);
      console.log("etat d'expiration token dans la navbar dans main.tsx", validTimeToken);
    }
    if (validTimeToken === "token expiré") {
      window.location.reload();
    }
    axios
      .get("http://localhost:8080/api/services/byUser", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        mesServices = res.data;
        setCardDisplay(mesServices);
        setCompteTempsDisplay(monCompteTemps);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
       .get("http://localhost:8080/api/services/byClient", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        mesServicesClient = res.data;
        setCardClientDisplay(mesServicesClient);
      })
      .catch((error) => {
        console.log(error);
      });

  },[])
 monCompteTemps = mesServices[0];
console.log("compteTempsDisplay::::::::::::::::", compteTempsDisplay?.createur.compte_temps);
console.log(
  "monCompteTemps.createur.compte_temps",
  monCompteTemps
);

console.log(",,,,,,,,cardDisplay", cardDisplay);
console.log(",,,,,,,,cardClientDisplay", cardClientDisplay);
const navigate = useNavigate();

const boutonCreateEvent = (e:React.MouseEvent<HTMLButtonElement>) => {

  navigate('/CreateService');
}

const boutonModifEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
  navigate(`/modifCompte/${tokenRole}`);
};

const boutonDeleteEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
 e.preventDefault();

 console.log("bouton cliqué!");
 if (window.confirm("Voulez vous vraimenr supprimer définitivement votre compte?")) {
   axios
     .delete(`http://localhost:8080/api/users/${tokenRole}`, {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
       },
     })
     .then((res) => {
       setMessage("Votre compte à été définitivement supprimé ");

       // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
       console.log(`le user ${tokenRole} a bien été sucré3333333`);
      //  window.location.reload();
       navigate("/welcome")
     })
     .catch((error) => {
       console.log(error);
     });
 }

}

  return (
    <div>
      <h1 className="titreMain">Journal de Bord</h1>
      <p className="compteTemps">Mon compte temps: <span className="compteur">{compteTempsDisplay?.createur.compte_temps}</span></p>
      <div className="flex">
        <div className="createService">
          <h3>Créer un service</h3>
          <Bouton handleClick={boutonCreateEvent} />
        </div>
        <div className="modifcompte">
          <h3>Modifier mon compte</h3>
          <div id="boutonModif">
            <Bouton handleClick={boutonModifEvent} />
          </div>
        </div>
        <div className="supprimcompte">
          <h3 className="titreSupprimCompte">Supprimer mon compte</h3>

          <SubmitBouton handleClick={boutonDeleteEvent} />
        </div>
      </div>
      <div className="getServices">
        <h3 className="titreSection">Vos services créés</h3>
        <ul>
          {cardDisplay.map((dataService) => (
            <li>
              {/* <Card service={card} /> */}
              <CardFinalise service={dataService} />
            </li>
          ))}
        </ul>
      </div>
      <div className="getClientServices">
        <h3 className="titreSection">Les services auxquels vous participez</h3>
        <ul >
          {cardClientDisplay.map((dataService) => (
            <li className="mainListe">
              {/* <Card service={card} /> */}
              <CardClient service={dataService} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;


