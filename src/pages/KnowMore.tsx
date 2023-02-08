import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./KnowMore.css";
import { Services } from "./Services";
import { useLocation, useParams } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import { UserContext } from "../Context.ts/User-context";

let serviceDisplayed;

const KnowMore = () => {
  const [displayCard, setDisplayCard] = useState<Services>();
  const { userCo } = useContext(UserContext);
  console.log("userCo?.id!!!!!!", userCo?.id);
  const location = useLocation();
  const params = useParams();
  console.log("________params", params);
  console.log("________location", location);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/services/detail/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        serviceDisplayed = res.data;
        console.log("serviceDisplayed", serviceDisplayed);
        setDisplayCard(serviceDisplayed);
      })
      .catch((error) => console.log(error));
  }, []);

console.log("DisplayCard", displayCard)

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("bouton cliqué");

    axios
      .patch(
        `http://localhost:8080/api/services/valid/${params.id}`,
      
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
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
