import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidBouton from "../components/ValidBouton";
import "./Contact.css";

const Contact = () => {
   const [champManquant, setChampManquant] = useState<string>();
 const dateElement = useRef<HTMLInputElement>(null);
 const mailElement = useRef<HTMLInputElement>(null);
 const messageElement = useRef<HTMLInputElement>(null);
 const navigate = useNavigate();

 const handleSubmitForm = (e: React.FormEvent) => {
   e.preventDefault();
   console.log("button form clicked");
   console.log(mailElement.current?.value);
   console.log(dateElement.current?.value);
   console.log(messageElement.current?.value);

 

   axios
     .post(`http://localhost:8080/api/messagerie`, {
       date: dateElement.current?.value,
       mail: mailElement.current?.value,
       message: messageElement.current?.value,
     })

     .then((response) => {
       console.log("le console.log du response.data", response.data);
       alert("votre message a  bien été envoyé");
       navigate("/welcome");
     })

     .catch((error) => {
       setChampManquant(error.response.data.message);
       console.error("something went wrong", error);
     });
 };

 return (
   <div>
     <h1 className="title-contact">Contact</h1>
     <div className="container-form-contact">
       <div className="container w-75 contact">
         <div className="form-floating mb-3 contact">
           <input
             name="date"
             type="text"
             className="form-control contact"
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
         {/* <span className="messageConnexion">{message}</span> */}
       </div>
       <span className="messageDynamique">{champManquant}</span>
     </div>
     <div className="container w-50">
       <ValidBouton handleClick={handleSubmitForm} />
       {/* <span className="message">{message}</span> */}
     </div>
   </div>
 );
};

export default Contact;
