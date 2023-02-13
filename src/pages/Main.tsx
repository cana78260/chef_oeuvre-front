import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../components/Bouton";
import CardClient from "../components/CardClient";
import CardFinalise from "../components/CardFinalise";
import "./Main.css";
import  { Category, User } from "./Services";
import { Link } from "react-router-dom";



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

  useEffect(()=>{
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

const boutonEvent = (e:React.MouseEvent<HTMLButtonElement>) => {

  navigate('/CreateService');
}

  return (
    <div>
      <h1>Journal de Bord</h1>
      <div className="createService">
        <h3>Créer un service</h3>
        <Bouton handleClick={boutonEvent} />
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
