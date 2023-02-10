import React from 'react';
import { Services } from '../pages/Services';
import "./CardClient.css";



export interface ServiceProp {
service: Services;

  // categorie: Category;
}

const CardClient = ({ service }: ServiceProp) => {
  return (
    <div>
      {/* {service.client !== null ? ( */}
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
                  <li className="card-text">
                    Pseudo: {service.createur.pseudo}
                  </li>
                  <li className="card-text">
                    Département: {service.createur.departement}
                  </li>
                </ul>
                {/* <p className="card-text">
                  <small className="text-muted">
                    Pseudo: {service.service.createur.pseudo}
                  </small>
                </p> */}
               
              </div>
            </div>
          </div>
        </div>
      {/* ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default CardClient;