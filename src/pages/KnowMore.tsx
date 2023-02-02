import axios from "axios";
import React, { useEffect, useState } from "react";
import "./KnowMore.css";
import { Services } from "./Main";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Bouton from "../components/Bouton";
import ValidBouton from "../components/ValidBouton";
import { userInfo } from "os";

export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}

let serviceDisplayed;

const KnowMore = () => {
  const [displayCard, setDisplayCard] = useState<Services>();
  const navigate = useNavigate();

  const location = useLocation();
  const params = useParams();
  console.log("________params", params);
  console.log("________location", location);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/services/detail/${params.id}`)
      .then((res) => {
        serviceDisplayed = res.data;
        setDisplayCard(serviceDisplayed);
      })
      .catch((error) => console.log(error));
  }, []);

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
       console.log("bouton cliqué");

//        let test:PayloadToken;
//        let testId:string = test.id
//        if(testId){
// console.log("test", testId);
//        }




    axios
      .patch(`http://localhost:8080/api/services/valid/${params.id}`, {

        
      },
       
         {headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
         },}
      )
      .then((res) => {
        console.log("---------res", res);
      })
      .catch((error) => {
        console.log(error);
        if(error.response.data.statusCode === 401) {
          //401 signifie que l'accès à la ressource necessite une authentification
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  };

  return (
    <div>
      <p>Knowmore</p>
      <div className="détails">
        <h3>Détails du service</h3>
        <p>Catégorie: {displayCard?.categorie.intitule}</p>
        <p>titre:{displayCard?.titre}</p>
        <p>Pseudo: {displayCard?.createur.pseudo}</p>
        <p>Département: {displayCard?.departement}</p>
        <p>Ville: {displayCard?.localisation}</p>
        <p>date d'échéance: {displayCard?.echeance}</p>
        <p>Détails de la demande: {displayCard?.libelle}</p>
        <ValidBouton handleClick={boutonEvent} />
      </div>
    </div>
  );
};

export default KnowMore;
