import React, { useEffect, useState } from "react";
import classes from "./Game.module.css";
import CardsSelection from "../../components/CardsSelection/CardsSelection";
import CardsList from "../../components/CardsList/CardsList";
import GameResult from "../../components/GameResult/GameResult";
import { getUniqueRandomNumbers } from "../../serverApi/numbers";

const noOfCardsArr = [4, 8, 12];

const Game: React.FC = () => {
  const [noOfCards, setNoOfCards] = useState<number>(0);
  const [cardsArr, setCardsArr] = useState<
    {
      showCard: boolean;
      value: number;
      incorrectSelection?: boolean;
    }[]
  >();
  const [expectedAnswer, setExpectedAnswer] = useState<number[]>();
  const [userAnswers, setUserAnswers] = useState<
    { selectedCard: number; selectionDate: Date }[]
  >([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [totalSelectionError, setTotalSelectionError] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (totalSelectionError) {
      timer = setTimeout(() => {
        setCardsArr((prevCardsArr) =>
          prevCardsArr?.map((prevCardObj) => {
            return {
              ...prevCardObj,
              incorrectSelection: false,
            };
          })
        );
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
          setCardsArr(
            randomNumbers.map((value) => ({ value, showCard: true }))
          );
          setExpectedAnswer([...randomNumbers].sort((a, b) => a - b));
        })
        .catch((error: unknown) => {
          alert(error);
        });
    }
  }, [noOfCards]);

  useEffect(() => {
    if (userAnswers.length && expectedAnswer?.length) {
      if (userAnswers.length === expectedAnswer.length) {
        setGameCompleted(true);
      }
    }
  }, [userAnswers, expectedAnswer]);

  const onGameStart = () => {
    setCardsArr((prevCardsArr) =>
      prevCardsArr?.map((prevCardObj) => {
        return { ...prevCardObj, showCard: false };
      })
    );
    setGameStarted(true);
  };

  const onCardClick = (cardValue: number) => {
    if (expectedAnswer?.length) {
      const changedIndex = userAnswers.length;

      if (cardValue === expectedAnswer[changedIndex]) {
        setCardsArr((prevCardsArr) =>
          prevCardsArr?.map((prevCardObj) => {
            if (prevCardObj.value === cardValue) {
              return {
                ...prevCardObj,
                showCard: true,
                incorrectSelection: false,
              };
            }
            return { ...prevCardObj };
          })
        );
        setUserAnswers((prevState) => [
          ...prevState,
          { selectedCard: cardValue, selectionDate: new Date() },
        ]);
      } else {
        setCardsArr((prevCardsArr) =>
          prevCardsArr?.map((prevCardObj) => {
            if (prevCardObj.value === cardValue) {
              return {
                ...prevCardObj,
                showCard: false,
                incorrectSelection: true,
              };
            }
            return { ...prevCardObj };
          })
        );

        setTotalSelectionError((prevErrorCount) => prevErrorCount + 1);
      }
    }
  };

  const onReplayHandler = () => {
    setNoOfCards(0);
    setCardsArr(undefined);
    setExpectedAnswer(undefined);
    setUserAnswers([]);
    setGameCompleted(false);
    setGameStarted(false);
  };

  return (
    <div className={classes["game-container"]}>
      <CardsSelection
        disableCardsSelection={gameStarted}
        noOfCardsArr={noOfCardsArr}
        onCardsSelection={(selectedNoOfCards: number) => {
          setNoOfCards(selectedNoOfCards);
        }}
        onGameStart={onGameStart}
        selectedNoOfCards={noOfCards}
      />
      <CardsList onCardClick={onCardClick} cardsList={cardsArr} />
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
