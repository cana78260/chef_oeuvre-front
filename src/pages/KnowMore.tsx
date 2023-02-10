import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./KnowMore.css";
import { PayloadToken, Services, User } from "./Services";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import { UserContext } from "../Context.ts/User-context";
import {AuthContext} from "../Context.ts/Auth-context";
import jwt_decode from "jwt-decode";
// import { useHistory } from "react-router-dom";

let serviceDisplayed;

const KnowMore = () => {
    const [message, setMessage] = useState<string>();
  const [displayCard, setDisplayCard] = useState<Services>();
  // const history = useHistory();
const [tokenId, setTokenId] = useState<string>();
  const { savedToken, onAuthChange} = useContext(AuthContext)
  const {userCo} = useContext(UserContext)
  // console.log("userCo?.id!!!!!!", userCo?.id);
  const location = useLocation();
  const params = useParams();
  console.log("________params", params);
  console.log("________location", location);
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
        // setUser(userCo)
      })
      .catch((error) => console.log(error));
  }, []);
console.log("SavedToken après use effect",tokenId);
console.log("DisplayCard", displayCard)

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log("bouton cliqué");
      // if (userCo) {
    //    setUser(userCo);
    //  }
  // console.log("user", user)
    // console.log("111111111userCo?.id", userCo?.id);
    console.log("22222222222displayCard?.createur.id", displayCard?.createur.id);
//         if(userCo?.id && displayCard){
// if(userCo.id===displayCard.createur.id){
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
        console.log("---------res", res);
        navigate("/services")
      })
      .catch((error) => {
        console.log(error);
      });
  }}};

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
        <span className="message">{message}</span>
      </div>
    </div>
  );
};
 
export default KnowMore;
  