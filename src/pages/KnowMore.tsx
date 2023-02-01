import axios from "axios";
import React, { useEffect, useState } from "react";
import "./KnowMore.css";
import { Services } from "./Main";
import { useLocation, useParams } from "react-router-dom";
import Bouton from "../components/Bouton";
import ValidBouton from "../components/ValidBouton";

let serviceDisplayed;

const KnowMore = () => {
  const [displayCard, setDisplayCard] = useState<Services>();

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
    axios
      .patch(`http://localhost:8080/api/services/valid/${params.id}`, {
       
          client: "687152e8-1d45-42ad-ab33-c56e7e6e71fa",
        
        
      })
      .then((res) => {
        console.log("---------res", res);
      })
      .catch((error) => {
        console.log(error);
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
