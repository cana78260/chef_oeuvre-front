import React from 'react';
import "./Bouton.css";


interface BoutonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}




const Bouton = ({handleClick}: BoutonProps) => {


const click = (event: React.MouseEvent<HTMLButtonElement>) => 
handleClick(event);




    return (
      <div>
        <button
          type="button"
          className="css-button-retro--green"
          onClick={click}
  
        >
          Détails
        </button>
      </div>
    );
};

export default Bouton;