import React, { useEffect, useState } from "react";
import classes from "./Card.module.css";

interface CardProps {
  value: number;
  showCard: boolean;
  incorrectSelection?: boolean;
  onCardClick(cardValue: number): void;
}

const Card: React.FC<CardProps> = (props) => {
  const { value, onCardClick, showCard, incorrectSelection } = props;
  const classArr = [classes["card__elem"]];

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
          onClick={() => onCardClick(value)}
        >
          Click Me
        </div>
      </div>
    </div>
  );
};

export default Card;
