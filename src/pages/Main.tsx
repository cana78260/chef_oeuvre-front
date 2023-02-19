import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../components/Bouton";
import CardClient from "../components/CardClient";
import CardFinalise from "../components/CardFinalise";
import "./Main.css";
import  { Category, PayloadToken, User } from "./Services";
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


const Main = () => {

  const [cardDisplay, setCardDisplay] = useState<Services[]>([...mesServices])
  const [cardClientDisplay, setCardClientDisplay] = useState<Services[]>([...mesServicesClient]);
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
      <h1>Journal de Bord</h1>
      <div className="flex">
        <div className="createService">
          <h3>Créer un service</h3>
          <Bouton handleClick={boutonCreateEvent} />
        </div>
        <div className="modifcompte">
          <h3>Modifier mon compte</h3>
          <Bouton handleClick={boutonModifEvent} />
        </div>
        <div className="modifcompte">
          <h3>Supprimer mon compte</h3>
          <SubmitBouton handleClick={boutonDeleteEvent} />
        </div>
      </div>
      <div className="getServices">
        <h3>Vos services créés</h3>
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
        <h3>Les services auxquels vous participez</h3>
        <ul>
          {cardClientDisplay.map((dataService) => (
            <li>
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


