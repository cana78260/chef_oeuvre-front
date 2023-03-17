import axios from 'axios';
import e from 'cors';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ValidBouton from '../components/ValidBouton';
import "./DeleteService.css";

const DeleteService = () => {
  const params = useParams();
  const navigate=useNavigate();
   const [message, setMessage] = useState<string>();


const supprimFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  console.log("bouton cliqué!")
  axios
    .delete(`http://localhost:8080/api/services/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    })
    .then((res) => {
      setTimeout(() => {
        navigate("/main");
      }, 2000);
      setMessage(
        "Le service à été définitivement supprimé "
      );

      // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
      console.log(`les service ${params.id} a bien été sucré3333333`);
    })
    .catch((error) => {
      console.log(error);
    });
};


    return (
      <div>
        <h3 className="titreSupprimService">Supprimer mon Service</h3>
        <div className="corpsSupprimService">
          <p className="texteSupprimService">
            Vous êtes sur le point de supprimer votre service
          </p>
          <p className="texteSupprimService">
            Cette suppression sera définitive, veuillez cliquer sur le bouton
            "Valider" pour confirmer
          </p>
          <span id="deleteService">{message}</span>
        </div>
        <div id="boutonSupprim">
          {" "}
          <ValidBouton handleClick={supprimFunction} />
        </div>
      </div>
    );
};

export default DeleteService;