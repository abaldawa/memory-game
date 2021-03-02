import React from "react";
import classes from "./CardsList.module.css";
import CardComp from "../Card/Card";
import type { Card } from "../../store/game/state";

interface CardsListProps {
  cardsList?: Card[];
  children?: never;
  onCardClick(cardValue: number): void;
}

const CardsList: React.FC<CardsListProps> = (props) => {
  const { cardsList, onCardClick } = props;

  return cardsList ? (
    <div className={classes["cards-list"]}>
      {cardsList.map((cardObj) => (
        <CardComp key={cardObj.value} onCardClick={onCardClick} {...cardObj} />
      ))}
    </div>
  ) : null;
};

export default CardsList;
