import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import "./Admin.css";
import { User } from './Services';



let listUsers: User[] = [];

const AdminUser = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>();
    const [listUserDisplayed, setlistUserDisplayed] = useState<
      User[]
    >([...listUsers]);

    useEffect(() => {
      axios
        .get("http://localhost:8080/api/users", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        })
        .then((res) => {
          listUsers = res.data;
          setlistUserDisplayed(listUsers);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

const modifEventUser = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log("current.......", e.currentTarget.value);
  console.log("listServiceDisplayed.......", listUserDisplayed);
  navigate(`/adminModifyUser/${e.currentTarget.value}`);
};

const supprimEventUser = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  console.log("bouton cliqué!");
  if (window.confirm("Supprimer cet utilisateur?")) {
    axios
      .delete(`http://localhost:8080/api/users/${e.currentTarget.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        setMessage("L'utilisateur à été définitivement supprimé ");

        // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
        console.log(`le user ${params.id} a bien été sucré3333333`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};



    return (
      <div>
        <h1 className="titreAdminUtilisateur">Liste des Utilisateurs</h1>
        <ul>
          {listUserDisplayed.map((user) => (
            <li>
              <div className="list-group" style={{ maxWidth: 840 }}>
                <a href="#" className="list-group-item list-group-item-action ">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      {user.nom} {user.prenom}
                    </h5>{" "}
                    <div className="spaceAdminUser">
                      <button
                        className="iconeModifyAdmin"
                        onClick={modifEventUser}
                        value={user.id}
                      >
                        <FaPencilAlt className="mr-3" />
                      </button>
                    </div>
                    <button
                      className="iconeDeleteAdmin"
                      onClick={supprimEventUser}
                      value={user.id}
                    >
                      <GoTrashcan />
                    </button>
                  </div>
                  <p className="mb-1">{user.mail}</p>
                  <small className="text-muted">
                    {user.adresse}/{user.ville}/{user.departement}
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

export default AdminUser;