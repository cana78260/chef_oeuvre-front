import axios from "axios";
import "./Services.css";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import Card, { CardDetail } from "../components/CardDetail";

//  interface pour l'objet du token payload decodé
export interface PayloadToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
  username: string;
}

export interface Role {
  id: string;
  label: string;
  users: User;
}

export interface Messagerie {
  id: string;
  date: string;
  message: string;
  user: User;
}

export interface Category {
  id: string;
  intitule: string;
  image: string;
}
export interface User {
  id: string;
  nom: string;
  prenom: string;
  pseudo: string;
  age: number;
  genre: string;
  adresse: string;
  ville: string;
  departement: string;
  mail: string;
  mot_de_passe: string;
  compte_temps: number;
  moyenne_notes: number;
  role: Role;
  service: Services;
  messagerie: Messagerie;
}

export interface Services {
  id: string;
  titre: string;
  localisation: string;
  departement: string;
  creation: string;
  echeance: string;
  note: number;
  libelle: string;
  createur: User;
  client: User;
  categorie: Category;
}

let listServices: Services[] = [];
let Categories: Category[] = [];
const Services = () => {
  const [listServiceDisplayed, setlistServiceDisplayed] = useState<Services[]>([
    ...listServices,
  ]);

  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [checkCategories, setCheckCategories] = useState<string[]>([]);
  // const [searchBarInput, setSearchBarInput] = useState<string>();
  const searchBarInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/services")
      .then((res) => {
        listServices = res.data;
        setlistServiceDisplayed(listServices);
        console.log("---------------listServices", listServices);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => {
        Categories = res.data;

        setListCategories(Categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("**************listCategories", listCategories);

  function handleCheckCategories(e: React.ChangeEvent<HTMLInputElement>) {
    let tab: string[] = [];

    if (e.currentTarget.checked) {
      tab = [...checkCategories, e.currentTarget.value];
    } else {
      tab = [
        ...checkCategories.filter((categ) => categ !== e.currentTarget.value),
      ];
    }
    setCheckCategories(tab);

    let resultFilteredServices: Services[];
    if (tab.length > 0) {
      resultFilteredServices = listServices.filter((serv) =>
        tab.includes(serv.categorie.intitule)
      );
      console.log("----------------listServices", listServices);

      console.log(";;;;;;;;;;;;;;;tab", tab);
    } else {
      resultFilteredServices = [...listServices];
    }

    setlistServiceDisplayed(resultFilteredServices);

    console.log("resultfilter***************", resultFilteredServices);
  }

    const [searchValue, setSearchValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
  const handleSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
  const value = inputRef.current?.value ||"";
  setSearchValue(value);
  }
  console.log("searchValue,,,,,,,,,,,,", searchValue);
//   const handleSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     let searchbarValue;
//     if(searchbarValue){
//       searchbarValue = searchBarInput.current?.value
//     }
//     console.log("searchbar,,,,,,,,,,,,,", searchbarValue);
//   };
// console.log("searchbar,,,,,,,,,,,,,", handleSearchBar);
//   console.log("searchBarInput--------------", searchBarInput);
  return (
    <div>
      <div className="d-flex align-items-stretch">
        {/* <SideBar listElementCategories={listCategories} /> */}
        <div className="custom-side-bar flex-shrink-0 bg-warning border-end">
          <div className="p-3 border-bottom">
            <span className="fs-5 fw-semibold">Filtres</span>
          </div>
          <ul className="list-unstyled ps-0">
            <div className="p-3">
              <p className="mb-1 fs-5 fw-semibold">Catégories</p>
              {listCategories.map((cat) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={cat.intitule}
                    id={cat.intitule}
                    onChange={handleCheckCategories}
                  />
                  <label className="form-check-label" htmlFor={cat.intitule}>
                    {cat.intitule}
                  </label>
                </div>
              ))}
            </div>
          </ul>
        </div>

        <div
          className="container-fluid custom-main"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {/* {servicesDisplayed.map()} */}
          {/* <p>Journal de bord</p> */}

          <div>
            <div>
              <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      // id="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchValue}
                      onChange={handleSearchBar}
                      ref={inputRef}
                    />
                    {/* <label className="form-control me-2" htmlFor="search"/> */}
                  </form>
                </div>
              </nav>
            </div>
            <ul>
              {listServiceDisplayed.map((dataService) => (
                <>
                  {/* <li>{service.categorie.intitule}</li>
                  <li>{service.creation}</li>
                  <li>
                    <img
                      src={`http://localhost:8080/${service.categorie.image}`}
                    />
                    {service.categorie.image}
                  </li> */}
                  <li>
                    <CardDetail service={dataService} />
                  </li>
                  <li>{/* <Bouton onClick={}/> */}</li>
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
