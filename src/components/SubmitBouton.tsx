import React from 'react';
import "./SubmitBouton.css";

interface BoutonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitBouton = ({ handleClick }: BoutonProps) => {
  const click = (event: React.MouseEvent<HTMLButtonElement>) =>
    handleClick(event);

  return (
    <div>
      <button
        type="button"
        className="css-button-retro--red"
        onClick={click}
      >
        Soumettre
      </button>
    </div>
  );
};

export default SubmitBouton;