import React from "react";
import classes from "./Card.module.css";
import type { Card } from "../../store/game/state";

interface CardProps extends Card {
  children?: never;
  onCardClick(cardValue: number): void;
}

const CardComp: React.FC<CardProps> = (props) => {
  const { value, onCardClick, showCard, incorrectSelection } = props;

  return (
    <div className={classes.card}>
      <div
        className={`
          ${classes["card__elem"]}
          ${!showCard ? classes["card__elem--showBack"] : ""}
        `}
      >
        <div className={`${classes["card__elem-face"]} ${classes.front}`}>
          {value}
        </div>
        <div
          className={`
            ${classes["card__elem-face"]} 
            ${classes.back}
            ${incorrectSelection ? classes["incorrect-selection"] : ""}
          `}
          onClick={() => !showCard && onCardClick(value)}
        >
          Click Me
        </div>
      </div>
    </div>
  );
};

export default CardComp;
