import axios from "axios";
import React, { useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FinaliseBouton from "../components/FinaliseBouton";
import SubmitBouton from "../components/SubmitBouton";
import "./FinaliseService.css";

const FinaliseService = () => {
 const [message, setMessage] = useState<string>();
  const FinaliseServ = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  console.log("________params", params);
  console.log("________location", location);

  const boutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("bouton cliqué!");

    axios
      .patch(
        `http://localhost:8080/api/services/finalise/${params.id}`,
        {
          compte_temps: Number(FinaliseServ.current?.value)
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
      .then((res) => {
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
               "les deux comptes temps ont été mis à jour, merci pour tout! "
             );

            // alert("les deux comptes temps ont été mis à jour, merci pour tout! ")
            console.log(`les service ${params.id} a bien été sucré3333333`);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

      
  };
  return (
    <div>
      <h3>Finalise</h3>
      <div>
        <form className="formConnexion">
          <div className="mb-3 mail-container">
            <label htmlFor="inputMail" className="htmlForm-label" />
            <input
              type="text"
              className="htmlForm-control"
              id="inputHour"
              placeholder="Nombre d'heures"
              ref={FinaliseServ}
            />
          </div>
          <SubmitBouton handleClick={boutonEvent} />
          <span className="message">{message}</span>
          {/* <button type="submit" className="btn inscription">
              {" "}
              Se connecter
            </button> */}
        </form>
        {/* <Link className="linkSub" to="/mdpoubli">
                <p className="lienInscription"> Mot de passe oublié ?</p>
              </Link> */}
      </div>
      {/* <span className="message">{message}</span> */}
    </div>
  );
};

export default FinaliseService;
