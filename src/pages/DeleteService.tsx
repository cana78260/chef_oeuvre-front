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
        <h3>Vous êtes sur le point de supprimer votre service</h3>
        <ValidBouton handleClick={supprimFunction} />
        <span className="message">{message}</span>
      </div>
    );
};

export default DeleteService;