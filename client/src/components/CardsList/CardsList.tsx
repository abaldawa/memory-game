import React from "react";
import classes from "./CardsList.module.css";
import Card from "../Card/Card";

type CardsListType = {
  showCard: boolean;
  value: number;
  incorrectSelection?: boolean;
  clickedAt?: Date;
}[];

interface CardsListProps {
  cardsList?: CardsListType;
  onCardClick(cardValue: number): void;
}

const CardsList: React.FC<CardsListProps> = (props) => {
  const { cardsList, onCardClick } = props;

  return cardsList ? (
    <div className={classes["cards-list"]}>
      {cardsList.map((cardObj) => (
        <Card key={cardObj.value} onCardClick={onCardClick} {...cardObj} />
      ))}
    </div>
  ) : null;
};

export default CardsList;
