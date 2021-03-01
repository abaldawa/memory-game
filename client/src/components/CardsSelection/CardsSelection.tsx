import React from "react";
import classes from "./CardsSelection.module.css";

interface CardsSelectionProps {
  selectedNoOfCards: number;
  noOfCardsArr: number[];
  disableCardsSelection: boolean;
  children?: never;
  onGameStart(): void;
  onCardsSelection(noOfCards: number): void;
}

const CardsSelection: React.FC<CardsSelectionProps> = (props) => {
  const {
    selectedNoOfCards,
    onCardsSelection,
    noOfCardsArr,
    disableCardsSelection,
    onGameStart,
  } = props;

  return (
    <div className={classes["cards-selection__container"]}>
      <label className={classes["margin-right--1rem"]}>
        Select number of cards:
        <select
          className={classes["margin-left--1rem"]}
          disabled={disableCardsSelection}
          value={selectedNoOfCards}
          onChange={(event) => {
            onCardsSelection(+event.target.value);
          }}
        >
          <option value="0">Select</option>
          {noOfCardsArr.map((noOfCards) => (
            <option key={noOfCards} value={noOfCards}>
              {noOfCards}
            </option>
          ))}
        </select>
      </label>

      {selectedNoOfCards ? (
        <button
          className={`
            ${classes["play__button"]}
            ${disableCardsSelection ? classes["play__button--disabled"] : ""}
          `}
          disabled={disableCardsSelection}
          onClick={onGameStart}
        >
          START
        </button>
      ) : null}
    </div>
  );
};

export default CardsSelection;
