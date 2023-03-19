import axios from "axios";
import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import "./CreateService.css";
import { Category } from "./Services";
import { Services } from "./Services";


let categoryGroup:Category[] = []
// let categoryId:Category = 



const CreateService = () => {
 const [champManquant, setChampManquant] = useState<string>();
 const [message, setMessage] = useState<string>();
    const [categoryDisplay, setCategoryDisplay ] = useState<Category[]>([])
    const categorySelect = useRef<HTMLSelectElement>(null);
    const titreInput = useRef<HTMLInputElement>(null);
    const localisationInput = useRef<HTMLInputElement>(null);
    const departementInput = useRef<HTMLInputElement>(null);
    const creationInput = useRef<HTMLInputElement>(null);
    const echeanceInput = useRef<HTMLInputElement>(null);
    const libelleInput = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


useEffect(()=>{

    axios.get("http://localhost:8080/api/categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    })
    .then((res)=>{
        console.log("res.data.......", res.data);
        categoryGroup = res.data;
        
        setCategoryDisplay(categoryGroup)

    })
},[])

console.log("categoryGroup", categoryGroup);
console.log("categoryDisplay", categoryDisplay);
 




  const submitFonction = (e: FormEvent) => {
    e.preventDefault();
// let category:Category |null={
//   id: "",
//   intitule: "",
//   image: ""
// };

//   if(!categorySelect.current)
// {return;
  
// }
// const selectedCategorieIntitule = categorySelect.current?.value;
// console.log("^^^^^^^^^^selectedCategorieIntitule", selectedCategorieIntitule);
// const selectedCategorie = categoryDisplay.find((cat)=> cat.intitule===selectedCategorieIntitule);
// console.log("===========selectedCategorie", selectedCategorie);
// if(!selectedCategorie){
//   return;
// }

  //  category.intitule= categorySelect.current?.value;
  // category.intitule=categoryName ;
  // console.log("categoryName------------", categoryName);
  // let categoryId = category.id;
  // console.log("categoryId------------", categoryId)
  
axios.post("http://localhost:8080/api/services",{

titre: titreInput.current?.value,
localisation: localisationInput.current?.value,
departement: departementInput.current?.value,
creation: creationInput.current?.value,
echeance: echeanceInput.current?.value,
libelle: libelleInput.current?.value,
categorie: categorySelect.current?.value
// categorie:4,
// categorie: selectedCategorie.id,

},
 {
  
  headers: {
    authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
  }
}).then((res) =>{
setTimeout(() => {
  navigate("/main");
}, 2000);
setMessage(" service créé ");
})
.catch((error)=>{
  setChampManquant(error.response.data.message);
  console.log("error", error);
})
  
  };

  return (
    <div>
      {/* <div className="createService-page  ">
        <section className="container-form-global">
          <div className="container-form-sub ">
            <div className="createService ">
              <h1>Créez votre service</h1>
            </div>
            <form
              method="POST"
              className="createServiceForm "
              onSubmit={submitFonction}
            >
              <div className="mb-3">
                <label htmlFor="inputCatégorie" className="htmlForm-label" />

                <select
                  name="Catégorie"
                  id="inputCatégorie"
                  className="htmlForm-label select"
                  ref={categorySelect}
                  //   onChange={weightFunction}
                >
                  <option value="">Catégorie</option>
                  {categoryDisplay.map((categorie) => (
                    <option value={categorie.id}>{categorie.intitule}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputTitre"
                  className="htmlForm-label text-center"
                />{" "}
                <input
                  type="text"
                  className="htmlForm-control text-center "
                  id="inputTitre"
                  placeholder="Titre"
                  ref={titreInput}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputLocalisation"
                  className="htmlForm-label text-center"
                />
                <input
                  type="text"
                  className="htmlForm-control text-center"
                  id="inputLocalisation"
                  placeholder="Localisation"
                  ref={localisationInput}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputDepartement"
                  className="htmlForm-label text-center "
                />
                <input
                  type="text"
                  className="htmlForm-control text-center"
                  id="exampleInputAge"
                  placeholder="Departement"
                  ref={departementInput}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputCreation"
                  className="htmlForm-label text-center "
                />
                <input
                  type="text"
                  className="htmlForm-control text-center"
                  id="exampleInputCreation"
                  placeholder="Date de création"
                  ref={creationInput}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputEcheance"
                  className="htmlForm-label text-center "
                />
                <input
                  type="text"
                  className="htmlForm-control text-center"
                  id="exampleInputEcheance"
                  placeholder="Date du service"
                  ref={echeanceInput}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="inputLibelle"
                  className="htmlForm-label text-center"
                />
                <input
                  type="text"
                  className="htmlForm-control text-center"
                  id="inputLibelle"
                  placeholder="Détails du service"
                  ref={libelleInput}
                />
              </div>
              {/* <span className="messageDynamique">{champManquant}</span> */}
      {/* <ValidBouton handleClick={submitFonction} />
            </form>
          </div>
        </section>
      </div> */}
      {/* -------------------------------------------------------------------------- */}
      <div className="titreCreerService ">
        <h1>Créez votre service</h1>
      </div>
      <div className="container-form-ModifService">
        <div className="container w-75 ModifService">
          <div id="selectModif" className="form-floating mb-3 ModifService">
            <select
              name="Catégorie"
              id="inputCatégorie"
              className="form-floating mb-3 modifService"
              ref={categorySelect}
              //   onChange={weightFunction}
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
            <label htmlFor="floatingInput">Date de début: JJ-MM-AAAA</label>
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
            <label htmlFor="floatingInput">Date de fin: JJ-MM-AAAA</label>
          </div>
          <div className="form-floating mb-3 modifService">
            <input
              name="libellé"
              type="libellé"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={libelleInput}
            />
            <label htmlFor="floatingInput">Libellé</label>
          </div>
          <div className="SubmitModifService"></div>
          {/* <span className="messageConnexion">{message}</span> */}
        </div>
        <span className="messageDynamique">{champManquant}</span>
      </div>
      <p id="createService">{message}</p>
      <div className="container w-50">
        <ValidBouton handleClick={submitFonction} />
      </div>
    </div>
  );
};


//
export default CreateService;
