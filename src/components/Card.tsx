import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import Bouton from "./Bouton";
import "./Card.css";
import { Services } from "../pages/Main";
import { Link, useNavigate } from "react-router-dom";





export interface ServiceProp {
  service: Services;

  // categorie: Category;
}

export const Card = (service: ServiceProp ) => {
  // const [SelectedCard, setSelectedCard] = useState<Services>();

  const navigate = useNavigate();

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate(`/services/${service.service.id}`);

    const test = service.service;
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
      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`http://localhost:8080/${service.service.categorie.image}`}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                Catégorie: {service.service.categorie.intitule}
              </h5>

              <ul>
                <li className="card-text">Titre: {service.service.titre}</li>
                <li className="card-text">
                  Pseudo: {service.service.createur.pseudo}
                </li>
                <li className="card-text">
                  Département: {service.service.createur.departement}
                </li>
              </ul>
              {/* <p className="card-text">
                  <small className="text-muted">
                    Pseudo: {service.service.createur.pseudo}
                  </small>
                </p> */}
              <div>
                {" "}
                <Bouton handleClick={boutonEvent} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
//

export default Card;
