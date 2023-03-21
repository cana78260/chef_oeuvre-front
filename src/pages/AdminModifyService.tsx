import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import "./Admin.css";
import { Category } from "./Services";

let categoryGroup: Category[] = [];

const AdminModifyService = () => {
  const [categoryDisplay, setCategoryDisplay] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>();
  const categorySelect = useRef<HTMLSelectElement>(null);
  const titreInput = useRef<HTMLInputElement>(null);
  const localisationInput = useRef<HTMLInputElement>(null);
  const departementInput = useRef<HTMLInputElement>(null);
  const creationInput = useRef<HTMLInputElement>(null);
  const echeanceInput = useRef<HTMLInputElement>(null);
  const libelleInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      })
      .then((res) => {
        console.log("res.data.......", res.data);
        categoryGroup = res.data;

        setCategoryDisplay(categoryGroup);
      });
  }, []);

  const submitFonction = (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      titre: titreInput.current?.value,
      localisation: localisationInput.current?.value,
      departement: departementInput.current?.value,
      creation: creationInput.current?.value,
      echeance: echeanceInput.current?.value,
      libelle: libelleInput.current?.value,
      categorie: categorySelect.current?.value,
    };

    //
    const data: any = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value !== "") {
        data[key] = value;
      }
    }

    console.log("DAAAAATAAAA,", data);
    axios
      .patch(
        `http://localhost:8080/api/auth/service/${params.id}`,
        data,

        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((res) => {
        console.log("data.........", data);
        setTimeout(() => {
          navigate("/AdminServices");
        }, 2000);
        setMessage(
          "Vos modifications ont bien été prises en compte, merci pour tout! "
        );

        console.log(`les service ${params.id} a bien été sucré3333333`);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <div className="AdminTitremodifService ">
        <h1>Modification d'un service</h1>
      </div>
      <div className="container-form-ModifService">
        <div className="container w-75 ModifService">
          <div id="selectModif" className="form-floating mb-3 ModifService">
            <select
              name="Catégorie"
              id="inputCatégorie"
              className="form-floating mb-3 modifService"
              ref={categorySelect}
            >
              <option value="">Catégorie</option>
              {categoryDisplay.map((categorie) => (
                <option value={categorie.id}>{categorie.intitule}</option>
              ))}
            </select>
            <label htmlFor="inputCatégorie"></label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="titre"
              type="titre"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={titreInput}
            />
            <label htmlFor="floatingInput">Titre</label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="localisation"
              type="localisation"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={localisationInput}
            />
            <label htmlFor="floatingInput">Localisation</label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="département"
              type="département"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={departementInput}
            />
            <label htmlFor="floatingInput">Département</label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="création"
              type="création"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={creationInput}
            />
            <label htmlFor="floatingInput">Création: JJ-MM-AAAA</label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="échéance"
              type="échéance"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={echeanceInput}
            />
            <label htmlFor="floatingInput">Echéance: JJ-MM-AAAA</label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="libellé"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={libelleInput}
            />
            <label htmlFor="floatingInput">Libellé</label>
          </div>
          <div className="SubmitModifService"></div>
        </div>
      </div>
      <div className="container w-50">
        <ValidBouton handleClick={submitFonction} />
        <span className="message">{message}</span>
      </div>
    </div>
  );
};

export default AdminModifyService;
