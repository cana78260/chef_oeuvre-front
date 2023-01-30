import axios from "axios";
import React, { useEffect, useState } from "react";
import "./KnowMore.css";
import { Services } from "./Main";
import { useLocation, useParams } from "react-router-dom";

// export interface ServiceProp {
//   service: Services;

//   // categorie: Category;
// }

let serviceDisplayed;

const KnowMore = () => {
  const [displayCard, setDisplayCard] = useState<Services>();

  const location = useLocation()
  const params = useParams()
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
    

    console.log("::::::::::::::::::::displayCard", displayCard);
      },[])
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
      </div>
    </div>
  );
};

export default KnowMore;
