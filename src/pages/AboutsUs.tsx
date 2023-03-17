import React from "react";
import "./AboutUs.css";

const AboutsUs = () => {
  return (
    <div>
      <h2 className="aboutTitle">A propos de Fil en troc...</h2>
      <div className="container_pageAbout">
        <img src="/assets/aboutUs.png" alt="" />
        <div className="disclaimer_pageAbout">
          <p>
            {" "}
            <span className="disclaimer_span_about "> Fil en Troc</span> est un
            site totalement{" "}
            <span className="disclaimer_span_about ">gratuit.</span>
          </p>{" "}
          <p>
            Nous vous proposons{" "}
            <span className="disclaimer_span_about ">d'échanger</span> des
            services librement.
          </p>{" "}
          <p>
            Trouvez un service que vous recherchez qui est proposé par un membre
            ne notre communauté.
          </p>
          <p>
            Prenez contact avec ce membre afin de réaliser votre prestation.
          </p>
          <p>
            Utilisez votre crédit{" "}
            <span className="disclaimer_span_about ">compte-temps  </span>{" "}
            pour récompenser le membre qui vous a rendu service.
          </p>
          <p>
            L'équipe{" "}
            <span className="disclaimer_span_about "> Fil en Troc</span> vous
            permet de bénéficier d'un crédit de{" "}
            <span className="disclaimer_span_about "> 120 minutes</span> lors de
            votre inscription.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutsUs;
