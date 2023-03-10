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
  console.log("res.data=====", res.data);
  return navigate("/main");
})
.catch((error)=>{

  console.log("error", error);
})
  
  };

  return (
   
    <div>
      <div className="createService-page  ">
        <section className="container-form-global">
          <div className="container-form-sub ">
            <div className="createService ">
              <h1>Cr??ez votre service</h1>
            </div>
            <form
              method="POST"
              className="createServiceForm "
              onSubmit={submitFonction}
            >
              <div className="mb-3">
                <label htmlFor="inputCat??gorie" className="htmlForm-label" />

                <select
                  name="Cat??gorie"
                  id="inputCat??gorie"
                  className="htmlForm-label select"
                  ref={categorySelect}
                  //   onChange={weightFunction}
                >
                  <option value="">Cat??gorie</option>
                  {categoryDisplay.map((categorie) => (
                    <option value={categorie.id}>
                      {categorie.intitule}
                    </option>
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
                  placeholder="Date de cr??ation"
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
                  placeholder="D??tails du service"
                ref={libelleInput}
                />
              </div>
              {/* <span className="messageDynamique">{champManquant}</span> */}
              <ValidBouton handleClick={submitFonction} />
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateService;
