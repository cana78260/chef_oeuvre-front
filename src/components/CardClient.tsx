import React from "react";
import { Services } from "../pages/Services";
import "./CardClient.css";

export interface ServiceProp {
  service: Services;
}

const CardClient = ({ service }: ServiceProp) => {
  return (
    <div>
      <div id="card-client" className="card mb-3">
        <div id="contenu-client" className="row g-0">
          <div id="container_image_client" className="col-md-4">
            <img
              src={`http://localhost:8080/${service.categorie.image}`}
              id="image-client"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 id="texte-liste-client" className="card-title">
                Catégorie: {service.categorie.intitule}
              </h5>

              <ul id="liste-client">
                <li id="texte-liste-client" className="card-text">
                  Titre: {service.titre}
                </li>
                <li id="texte-liste-client" className="card-text">
                  Pseudo: {service.createur.pseudo}
                </li>
                <li id="texte-liste-client" className="card-text">
                  Département: {service.createur.departement}
                </li>
              </ul>
              <a id="ancre-client" href={`mailto:${service.createur.mail}`}>
                Contacter l'auteur
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClient;
