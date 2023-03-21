import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./KnowMore.css";
import { PayloadToken, Services} from "./Services";
import {  useNavigate, useParams } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import {AuthContext} from "../Context.ts/Auth-context";
import jwt_decode from "jwt-decode";


let serviceDisplayed;

const KnowMore = () => {
    const [message, setMessage] = useState<string>();
  const [displayCard, setDisplayCard] = useState<Services>();

const [tokenId, setTokenId] = useState<string>();
  const { savedToken, onAuthChange} = useContext(AuthContext)

  const params = useParams();
  console.log("________params", params);

  const navigate = useNavigate()
  console.log("SavedToken avant use effect", savedToken);
  useEffect(() => {
  
    onAuthChange(savedToken);
    if (savedToken) {
      const decoded: PayloadToken = jwt_decode(savedToken);
      console.log("le payload", decoded.id);
      setTokenId(decoded.id);
  
    }
  
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
console.log("SavedToken après use effect",tokenId);
console.log("DisplayCard", displayCard)

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(tokenId && displayCard){
if(tokenId===displayCard.createur.id){
setMessage("Désolé, ce service vous appartient")
}else{
    axios
      .patch(
        `http://localhost:8080/api/services/valid/${params.id}`,{
              client:tokenId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((res) => {
        navigate("/services")
      })
      .catch((error) => {
        console.log(error);
        if(error.response.data.statusCode === 401) {
          //401 signifie que l'accès à la ressource necessite une authentification
          localStorage.removeItem("accesstoken");
          navigate("/connexion");
        }
      });
  }}};

  return (
    <div>
      <div className="titreDétailService">
        <h1>Détails du service</h1>
      </div>

      <div className="container-détails">
        {" "}
        <div className="détails">
          <p>
            Catégorie:{" "}
            <span className="corpsSavoirPlus">
              {displayCard?.categorie.intitule}
            </span>
          </p>

          <p>
            titre:<span className="corpsSavoirPlus">{displayCard?.titre} </span>
          </p>

          <p>
            Pseudo:{" "}
            <span className="corpsSavoirPlus">
              {displayCard?.createur.pseudo}{" "}
            </span>
          </p>
          <p>
            Département:{" "}
            <span className="corpsSavoirPlus">{displayCard?.departement}</span>
          </p>
          <p>
            Ville:{" "}
            <span className="corpsSavoirPlus">{displayCard?.localisation}</span>
          </p>
          <p>
            date d'échéance:{" "}
            <span className="corpsSavoirPlus">{displayCard?.echeance}</span>
          </p>
          <p>
            Détails de la demande:
            <span className="corpsSavoirPlus"> {displayCard?.libelle}</span>
          </p>
          <p className="selectionService">Je sélectionne ce service</p>
          <span className="messageDetail">{message}</span>
        </div>
      </div>
      <div id="boutonSavoirPlus">
        {" "}
        <ValidBouton handleClick={boutonEvent} />
      </div>
    </div>
  );
};
 
export default KnowMore;
  