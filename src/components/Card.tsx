import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Bouton from './Bouton';
import "./Card.css";
import { Category, User } from '../pages/Main';
import { Services } from '../pages/Main';


export interface ServiceProp {
  service: Services;
  // categorie: Category;
 
}



const Card = (service: ServiceProp,  ) => {


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
                <h5 className="card-title">{service.service.categorie.intitule}</h5>

                <ul>
                  
                    <li className="card-text">{service.service.libelle}</li>
                
                </ul>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
                <div>
                  {" "}
                  <Bouton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Card;