import React, { useEffect, useReducer } from "react";
import classes from "./Game.module.css";
import { gameReducer } from "../../store/game/reducer";
import { gameState } from "../../store/game/state";
import GameHeading from "../../components/GameHeading/GameHeading";
import CardsSelection from "../../components/CardsSelection/CardsSelection";
import GameDescription from "../../components/GameDescription/GameDescription";
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

  let gameDescription: string | undefined;

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

  /**
   * This useEffect handler clears any incorrect
   * card clicks so that visually the cards appear
   * back to normal after 150 ms of clicking an
   * incorrect card
   */
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

  /**
   * This useEffect handler reacts to cards selection and
   * fetches the unique random numbers array from the server
   */
  useEffect(() => {
    if (noOfCards) {
      getUniqueRandomNumbers(10, 90, noOfCards)
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

  /**
   * This useEffect handler monitors when the game
   * is completed and dispatch game completed action
   * by listening to userAnswers and expectedAnswers.
   */
  useEffect(() => {
    if (
      userAnswers.length &&
      expectedAnswer?.length &&
      userAnswers.length === expectedAnswer.length
    ) {
      dispatch({ type: GAME_COMPLETED });
    }
  }, [userAnswers, expectedAnswer]);

  if (noOfCards) {
    if (gameStarted) {
      gameDescription = "Click the cards in the ascending order.";
    } else {
      gameDescription = "Remember the cards sequence in ascending order";
    }
  }

  return (
    <div className={classes["game-container"]}>
      <GameHeading text="Memory Game" />
      <CardsSelection
        disableCardsSelection={gameStarted}
        noOfCardsArr={noOfCardsArr}
        onCardsSelection={(selectedNoOfCards: number) => {
          dispatch({ type: SET_NO_OF_CARDS, payload: selectedNoOfCards });
        }}
        onGameStart={onGameStart}
        selectedNoOfCards={noOfCards}
      />
      <GameDescription text={gameDescription} />
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
