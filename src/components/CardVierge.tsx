import React, { FormEvent, useEffect, useState } from "react";
import Bouton from "./Bouton";
import "./CardVierge.css";
import { Services } from "../pages/Services";
import { Link, useNavigate } from "react-router-dom";
import FinaliseBouton from "./FinaliseBouton";

export interface ServiceProp {
  service: Services;

  // categorie: Category;
}





const CardVierge = ( {service}: ServiceProp) => {
    const navigate = useNavigate();

    const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate(`/FinaliseService/${service.id}`);

      const test = service;
      console.log("????????????test", test);

      // setSelectedCard(test);
      //

      //
    };
  return (
    <div>
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
              <div>
                {" "}
                <FinaliseBouton handleClick={boutonEvent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVierge;
