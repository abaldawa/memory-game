import React from "react";
import { getFormattedDate } from "../../utils/date";
import classes from "./GameResult.module.css";
import type { GameState } from "../../store/game/state";

interface GameResultProps {
  showResult: boolean;
  numberOfErrors: GameState["totalSelectionError"];
  selectionOrder: GameState["userAnswers"];
  children?: never;
  onReplayHandler(): void;
}

const GameResult: React.FC<GameResultProps> = (props) => {
  const { numberOfErrors, selectionOrder, showResult, onReplayHandler } = props;

  return showResult ? (
    <div className={classes["game-result-container"]}>
      <h3 className={classes["game-result__heading"]}>
        Game Result (Scrollable):
      </h3>
      <div
        className={`${classes["game-result__error-label"]} ${classes["padding--1rem"]}`}
      >
        Number of Errors
      </div>
      <div
        className={`${classes["game-result__error-count"]} ${classes["padding--1rem"]}`}
      >
        {numberOfErrors}
      </div>
      <div
        className={`${classes["game-result__selection-label"]} ${classes["padding--1rem"]}`}
      >
        selection order
      </div>
      <div
        className={`${classes["game-result__selection-details"]} ${classes["padding--1rem"]}`}
      >
        {selectionOrder.map((selection) => (
          <p key={selection.selectedCard}>
            <strong>{selection.selectedCard}</strong>
            {" -> "}
            <i>{getFormattedDate(selection.selectionDate)}</i>
          </p>
        ))}
      </div>
      <button
        className={classes["game-result__replay-button"]}
        onClick={onReplayHandler}
      >
        Replay
      </button>
    </div>
  ) : null;
};

export default GameResult;
