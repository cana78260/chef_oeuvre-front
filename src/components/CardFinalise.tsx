import React, { FormEvent, useEffect, useState } from "react";
import Bouton from "./Bouton";
import "./CardFinalise.css";
import { Services } from "../pages/Services";
import { Link, useNavigate, useParams } from "react-router-dom";
import FinaliseBouton from "./FinaliseBouton";
import { FaPencilAlt } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import axios from "axios";

export interface ServiceProp {
  service: Services;

  // categorie: Category;
}





const CardFinalise = ( {service}: ServiceProp) => {
    const navigate = useNavigate();
  

    const modifEvent = (event: React.MouseEvent<HTMLButtonElement>) => {

    navigate(`/modifyService/${service.id}`);
    };

    const supprimEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
 navigate(`/deleteService/${service.id}`);
    
    };

    const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate(`/finaliseService/${service.id}`);

      const test = service;
      console.log("????????????test", test);

      // setSelectedCard(test);
      //

      //
    };
  return (
    <div>
      <div id="card-finalise" className="card mb-3" style={{ maxWidth: 540 }}>
        <div id="contenu-finalise" className="row g-0">
          <div id="container_image_finalise" className="col-md-4">
            <img
              src={`http://localhost:8080/${service.categorie.image}`}
              id="image-finalise"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 id="texte-liste-finalise" className="card-title">
                Catégorie: {service.categorie.intitule}
              </h5>

              <ul>
                <li id="texte-liste-finalise" className="card-text">
                  Titre: {service.titre}
                </li>
                <li id="texte-liste-finalise" className="card-text">
                  Pseudo: {service.createur.pseudo}
                </li>
                <li id="texte-liste-finalise" className="card-text">
                  Département: {service.departement}
                </li>
              </ul>
              {/* <p className="card-text">
                  <small className="text-muted">
                    Pseudo: {service.service.createur.pseudo}
                  </small>
                </p> */}
              {service.client !== null ? (
                <div>
                  <div className="d-flex">
                    {" "}
                    <FinaliseBouton handleClick={boutonEvent} />
                    {/* <div className="space"> */}
                      <button className="iconeModify" onClick={modifEvent}>
                        <FaPencilAlt className="mr-3" />
                      </button>
                    {/* </div> */}
                    <button className="iconeDelete" onClick={supprimEvent}>
                      <GoTrashcan />
                    </button>
                  </div>
                  <a id="ancre-finalise" href={`mailto:${service.client.mail}`}>
                    Contacter le participant
                  </a>
                </div>
              ) : (
                <div className="d-flex">
                  <div className="space2">
                    <button className="iconeModify" onClick={modifEvent}>
                      <FaPencilAlt className="mr-3" />
                    </button>
                  </div>
                  <button className="iconeDelete" onClick={supprimEvent}>
                    <GoTrashcan />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFinalise;
