import React from 'react';
import Bouton from '../components/Bouton';
import "./Subscribe.css";

const Subscribe = () => {

const SubscribeBoutonEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("page subscribe");
};


    return (
        <div>
            Inscription
            <Bouton handleClick={SubscribeBoutonEvent}/>
        </div>
    );
};

export default Subscribe;