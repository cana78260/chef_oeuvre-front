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
      <div className="titreFinaliseService">
        <h3>Finalisez votre service</h3>
      </div>
      <div className="disclaimerFinalise">
        <p>
          <span className="spanFinalise">
            Bienvenue sur la page de finalisation de votre service
          </span>
        </p>
        <p>Vous allez conclure votre offre de service. </p>
        <p>
          Veuillez renseigner le temps que vous avez consacré à la réalisation
          de votre service.
        </p>
        <p>
          Le temps que vous allez renseigné doit être exprimé en{" "}
          <span className="spanFinalise">Minutes.</span>
        </p>
        <p>
          <span className="spanFinalise">Exemple:</span> Si vous avez consacré{" "}
          <span className="spanFinalise">1 heure</span>, indiquez{" "}
          <span className="spanFinalise">60</span> dans le champ
        </p>
        <p>
          Soyez <span className="spanFinalise">objectif</span> et{" "}
          <span className="spanFinalise">bienveillant</span> lorsque vous
          indiquerez ce temps.
        </p>
        <p>
          Gardez à l'esprit que ce chiffre sera débité du compte-temps de la
          personne à qui ce service à profité.
        </p>
      </div>
      {/* <div> */}
        {/* <form className="formConnexion">
          <div className="mb-3 mail-container">
            <label htmlFor="inputMail" className="htmlForm-label" />
            <input
              type="text"
              className="htmlForm-control"
              id="inputHour"
              placeholder="minutes"
              ref={FinaliseServ}
            />
          </div>
          <SubmitBouton handleClick={boutonEvent} />
          <span className="message">{message}</span> */}
          {/* <button type="submit" className="btn inscription">
              {" "}
              Se connecter
            </button> */}
        {/* </form> */}
        {/* <Link className="linkSub" to="/mdpoubli">
                <p className="lienInscription"> Mot de passe oublié ?</p>
              </Link> */}
      {/* </div> */}
      {/* <span className="message">{message}</span> */}
      {/* --------------------------------------------------------------------- */}
      <div className="container-form-finalise">
        <div className="container w-75 finalise">
          <div className="form-floating mb-3 finalise">
            <input
              name="nom"
              type="nom"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              ref={FinaliseServ}
            />
            <label htmlFor="floatingInput">Minutes</label>
          </div>
        </div>
      </div>
      <div className="submitFinalise">
        <SubmitBouton handleClick={boutonEvent} />
        {/* <span className="message">{message}</span> */}
      </div>
    </div>
  );
};

export default FinaliseService;
