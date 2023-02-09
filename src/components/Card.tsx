import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Bouton from "./Bouton";
import "./Card.css";
import { PayloadToken, Services } from "../pages/Services";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context.ts/Auth-context";
import jwt_decode from "jwt-decode";

export interface ServiceProp {
  service: Services;

  // categorie: Category;
}

export const Card = ({ service }: ServiceProp) => {
  // const [SelectedCard, setSelectedCard] = useState<Services>();
  console.log("SEEEEERVICE", service);

  const navigate = useNavigate();
  const [tokenRole, setTokenRole] = useState<string>();
const { savedToken, validTimeToken, tokenFunction, onAuthChange } =
  useContext(AuthContext);
 
   useEffect(() => {
     onAuthChange(savedToken);
     tokenFunction(savedToken);
     console.log("voici le resultat pour savedToken", savedToken);
     if (savedToken) {
       const decoded: PayloadToken = jwt_decode(savedToken);
       console.log("le payload", decoded.role);
       setTokenRole(decoded.role);
       console.log("etat d'expiration token dans la navbar", validTimeToken);
     }
     if (validTimeToken === "token expiré") {
       window.location.reload();
     }
   }, []);

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/services/${service.id}`);

    const test = service;
    console.log("????????????test", test);

    // setSelectedCard(test);
    //

    //
  };

  // useEffect(() => {
  //   if (SelectedCard) {
  //     axios
  //       .get(`http://localhost:8080/api/services/${SelectedCard.id}`)
  //       .then((res) => setSelectedCard(res.data))
  //       .catch((error) => console.log(error));
  //   }
  // }, [setSelectedCard]);

  // console.log("//////////////SelectedCard", SelectedCard);

  return (
    <div>
      {(service.client===null?(
      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`http://localhost:8080/${service.categorie.image}`}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                Catégorie: {service.categorie.intitule}
              </h5>

              <ul>
                <li className="card-text">Titre: {service.titre}</li>
                <li className="card-text">Pseudo: {service.createur.pseudo}</li>
                <li className="card-text">
                  Département: {service.createur.departement}
                </li>
              </ul>
              {/* <p className="card-text">
                  <small className="text-muted">
                    Pseudo: {service.service.createur.pseudo}
                  </small>
                </p> */}
                {savedToken?(
              <div>
                {" "}
                <Bouton handleClick={boutonEvent} />
              </div>
              ):(
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      ):<div></div>)}
    </div>
  );
};
//

export default Card;
