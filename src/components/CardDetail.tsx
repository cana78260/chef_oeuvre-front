import axios from "axios";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Bouton from "./Bouton";
import "./CardDetail.css";
import { PayloadToken, Services } from "../pages/Services";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context.ts/Auth-context";
import jwt_decode from "jwt-decode";

export interface ServiceProp {
  service: Services;
}

export const CardDetail = ({ service }: ServiceProp) => {
  console.log("SEEEEERVICE", service);

  const navigate = useNavigate();
  const [tokenRole, setTokenRole] = useState<string>();
  const { savedToken, validTimeToken, tokenFunction, onAuthChange } =
    useContext(AuthContext);
  const [SelectedCard, setSelectedCard] = useState<Services>();

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

  console.log("SelectedCard---------", SelectedCard);

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/services/${service.id}`);

    const test = service;
    console.log("????????????test", test);
  };

  return (
    <div>
      {service.client === null ? (
        <div className="card mb-3-detail" style={{ maxWidth: 540 }}>
          <div className="row g-0">
            <div id="containerImage" className="col-md-4">
              <img
                src={`http://localhost:8080/${service.categorie.image}`}
                className="img-fluid rounded-start-detail"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h6 className="card-title">
                  Catégorie: {service.categorie.intitule}
                </h6>

                <p className="card-text-Detail">Titre: {service.titre}</p>
                <p className="card-text-Detail">
                  Pseudo: {service.createur.pseudo}
                </p>
                <p className="card-text-Detail">
                  Département: {service.departement}
                </p>

                {savedToken ? (
                  <div className="containerBoutonDetail">
                    <div className="boutonDetail">
                      {" "}
                      <Bouton handleClick={boutonEvent} />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
//

export default CardDetail;
