import React from 'react';
import "./FinaliseBouton.css";

interface FinaliseBoutonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FinaliseBouton = ({ handleClick }: FinaliseBoutonProps) => {
  const click = (event: React.MouseEvent<HTMLButtonElement>) =>
    handleClick(event);

  return (
    <div>
      <button
        type="button"
        className="css-button-retro--rose"
        onClick={click}
      >
        Je finalise
      </button>
    </div>
  );
};

export default FinaliseBouton;