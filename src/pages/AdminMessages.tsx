import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import "./Admin.css";
import { Messagerie } from './Services';

let listMessages: Messagerie[] = [];

const AdminMessages = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>();
    const [listMessageDisplayed, setlistMessageDisplayed] = useState<
      Messagerie[]
    >([...listMessages]);

useEffect(() => {
  axios
    .get("http://localhost:8080/api/messagerie", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    })
    .then((res) => {
      listMessages = res.data;
      setlistMessageDisplayed(listMessages);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

console.log("params.......", params.id);
const supprimEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  console.log("bouton cliqué!");
  if (window.confirm("Supprimer ce message?")) {
    axios
      .delete(`http://localhost:8080/api/messagerie/${e.currentTarget.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        setMessage("Le message a été définitivement supprimé ");

        // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
        console.log(`les messages ${params.id} a bien été sucré3333333`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
console.log("listServiceDisplayed////", listMessageDisplayed);
    
    return (
      <div>
        <h3>Admin messages</h3>
        <h1 className="titreAdminService"> Liste des messages</h1>

        <ul>
          {listMessageDisplayed.map((mess) => (
            <li>
              <div className="list-group" style={{ maxWidth: 840 }}>
                <a href="#" className="list-group-item list-group-item-action ">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{mess.mail}</h5>{" "}
                    <button
                      className="iconeDelete"
                      onClick={supprimEvent}
                      value={mess.id}
                    >
                      <GoTrashcan />
                    </button>
                  </div>
                  <p className="mb-1">{mess.date}</p>
                  <small className="text-muted">
                    {mess.message}
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

export default AdminMessages;