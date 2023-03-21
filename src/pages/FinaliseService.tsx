import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    axios
      .patch(
        `http://localhost:8080/api/services/finalise/${params.id}`,
        {
          compte_temps: Number(FinaliseServ.current?.value),
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
        <p id="finaliseService">{message}</p>
      </div>

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
      </div>
    </div>
  );
};

export default FinaliseService;
