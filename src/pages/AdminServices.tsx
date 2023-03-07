import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import { servicesVersion } from 'typescript';
import "./Admin.css";
import { Services } from './Services';





let listServices: Services[] = [];


const AdminServices = () => {
   const params = useParams();
   const navigate = useNavigate();
const [message, setMessage] = useState<string>();
const [listServiceDisplayed, setlistServiceDisplayed] = useState<Services[]>([
  ...listServices,
]);


useEffect(()=>{axios
  .get("http://localhost:8080/api/services", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  })
  .then((res) => {
    listServices = res.data;
    setlistServiceDisplayed(listServices);
  })
  .catch((error) => {
    console.log(error);
  });
},[])



const modifEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("current.......", e.currentTarget.value);
  console.log("listServiceDisplayed.......", listServiceDisplayed);
 navigate(`/adminModifyServices/${e.currentTarget.value}`);
};

console.log("params.......", params.id);
const supprimEvent = (e: React.MouseEvent<HTMLButtonElement>) => {e.preventDefault();

console.log("bouton cliqué!");
 if (window.confirm("Supprimer ce service?")) {
axios
  .delete(`http://localhost:8080/api/services/${e.currentTarget.value}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  })
  .then((res) => {
   
    setMessage("Le service à été définitivement supprimé ");

    // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
    console.log(`les service ${params.id} a bien été sucré3333333`);
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}};
console.log("listServiceDisplayed////", listServiceDisplayed);
    return (
      <div>
        <h1 className="titreAdminService"> Liste des services</h1>

        <ul>
          {listServiceDisplayed.map((serv) => (
            <li>
              <div className="list-group" style={{ maxWidth: 840 }}>
                <a href="#" className="list-group-item list-group-item-action ">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{serv.titre}</h5>{" "}
                    <div className="spaceAdminService">
                      <button
                        className="iconeModify"
                        onClick={modifEvent}
                        value={serv.id}
                      >
                        <FaPencilAlt className="mr-3" />
                      </button>
                    </div>
                    <button
                      className="iconeDelete"
                      onClick={supprimEvent}
                      value={serv.id}
                    >
                      <GoTrashcan />
                    </button>
                  </div>
                  <p className="mb-1">{serv.createur.pseudo}</p>
                  <small className="text-muted">
                    {serv.departement} /{serv.localisation}
                  </small>
                  <span className="message">{message}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default AdminServices;