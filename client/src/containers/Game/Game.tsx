import React, { useEffect, useReducer } from "react";
import classes from "./Game.module.css";
import { gameReducer } from "../../store/game/reducer";
import { gameState } from "../../store/game/state";
import CardsSelection from "../../components/CardsSelection/CardsSelection";
import CardsList from "../../components/CardsList/CardsList";
import GameResult from "../../components/GameResult/GameResult";
import { getUniqueRandomNumbers } from "../../serverApi/numbers";
import {
  CLEAR_INCORRECT_SELECTION_STATUS,
  GAME_COMPLETED,
  GAME_STARTED,
  INVALID_CARD_CLICKED,
  REPLAY_GAME,
  SET_EXPECTD_ANSWERS,
  SET_NO_OF_CARDS,
  SET_UNIQUE_RANDOM_NUMBERS,
  VALID_CARD_CLICKED,
} from "../../store/game/actionTypes";

const noOfCardsArr = [4, 8, 12];

const Game: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, gameState);
  const {
    totalSelectionError,
    cards,
    expectedAnswer,
    gameCompleted,
    gameStarted,
    noOfCards,
    userAnswers,
  } = state;

  const onGameStart = () => {
    dispatch({ type: GAME_STARTED });
  };

  const onCardClick = (cardValue: number) => {
    if (expectedAnswer?.length) {
      const changedIndex = userAnswers.length;

      if (cardValue === expectedAnswer[changedIndex]) {
        dispatch({ type: VALID_CARD_CLICKED, payload: cardValue });
      } else {
        dispatch({ type: INVALID_CARD_CLICKED, payload: cardValue });
      }
    }
  };

  const onReplayHandler = () => {
    dispatch({ type: REPLAY_GAME });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (totalSelectionError) {
      timer = setTimeout(() => {
        dispatch({ type: CLEAR_INCORRECT_SELECTION_STATUS });
      }, 150);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [totalSelectionError]);

  useEffect(() => {
    if (noOfCards) {
      getUniqueRandomNumbers<number[]>(10, 90, noOfCards)
        .then((randomNumbers) => {
          dispatch({
            type: SET_UNIQUE_RANDOM_NUMBERS,
            payload: randomNumbers.map((value) => ({ value, showCard: true })),
          });

          dispatch({
            type: SET_EXPECTD_ANSWERS,
            payload: [...randomNumbers].sort((a, b) => a - b),
          });
        })
        .catch((error: unknown) => {
          alert(error);
        });
    }
  }, [noOfCards]);

  useEffect(() => {
    if (
      userAnswers.length &&
      expectedAnswer?.length &&
      userAnswers.length === expectedAnswer.length
    ) {
      dispatch({ type: GAME_COMPLETED });
    }
  }, [userAnswers, expectedAnswer]);

  return (
    <div className={classes["game-container"]}>
      <CardsSelection
        disableCardsSelection={gameStarted}
        noOfCardsArr={noOfCardsArr}
        onCardsSelection={(selectedNoOfCards: number) => {
          dispatch({ type: SET_NO_OF_CARDS, payload: selectedNoOfCards });
        }}
        onGameStart={onGameStart}
        selectedNoOfCards={noOfCards}
      />
      <CardsList onCardClick={onCardClick} cardsList={cards} />
      <GameResult
        numberOfErrors={totalSelectionError}
        selectionOrder={userAnswers}
        showResult={gameCompleted}
        onReplayHandler={onReplayHandler}
      />
    </div>
  );
};

export default Game;
