import React from 'react';
import "./ValidBouton.css";


interface ValidBoutonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const ValidBouton = ({ handleClick }: ValidBoutonProps) => {


const click = (event: React.MouseEvent<HTMLButtonElement>) =>
{  handleClick(event);}


  return (
    <div>
      {" "}
      <button type="button" className="css-button-retro--yellow" onClick={click}>
        Valider
      </button>
    </div>
  );
};

export default ValidBouton;