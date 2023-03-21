import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import "./Messagerie.css";

const Messagerie = () => {
  const dateElement = useRef<HTMLInputElement>(null);
  const mailElement = useRef<HTMLInputElement>(null);
  const messageElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    alert("votre message a  bien été envoyé");

    axios
      .post(`http://localhost:8080/api/messagerie`, {
        date: dateElement.current?.value,
        mail: mailElement.current?.value,
        message: messageElement.current?.value,
      })

      .then((response) => {
        console.log("le console.log du response.data", response.data);
        navigate("/welcome");
      })

      .catch((error) => {
        console.error("something went wrong", error);
      });
  };

  return (
    <div>
      <p>Messagerie</p>
      <div className="container-form-ModifService">
        <div className="container w-75 ModifService">
          <div className="form-floating mb-3 messagerie">
            <input
              name="date"
              type="text"
              className="form-control messagerie"
              id="floatingInput"
              placeholder="name@example.com"
              ref={dateElement}
            />
            <label htmlFor="floatingInput">Date: JJ-MM-AAAA</label>
          </div>
          <div className="form-floating mb-3 messagerie">
            <input
              name="mail"
              type="mail"
              className="form-control messagerie"
              id="floatingInput"
              placeholder="name@example.com"
              ref={mailElement}
            />
            <label htmlFor="floatingInput">mail</label>
          </div>
          <div className="form-floating mb-3 messagerie">
            <input
              name="message"
              type="message"
              className="form-control messagerie"
              id="floatingInput"
              placeholder="name@example.com"
              ref={messageElement}
            />
            <label htmlFor="floatingInput">Message</label>
          </div>
          <div className="SubmitMessage"></div>
        </div>
      </div>
      <div className="container w-50">
        <ValidBouton handleClick={handleSubmitForm} />
      </div>
    </div>
  );
};

export default Messagerie;
