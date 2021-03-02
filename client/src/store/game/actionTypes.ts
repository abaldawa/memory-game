import type { Card } from "./state";
export const SET_NO_OF_CARDS = "SET_NO_OF_CARDS";
export const SET_UNIQUE_RANDOM_NUMBERS = "SET_UNIQUE_RANDOM_NUMBERS";
export const GAME_STARTED = "GAME_STARTED";
export const VALID_CARD_CLICKED = "VALID_CARD_CLICKED";
export const INVALID_CARD_CLICKED = "INVALID_CARD_CLICKED";
export const INCR_TOTAL_SELECTION_ERROR = "INCR_TOTAL_SELECTION_ERROR";
export const GAME_COMPLETED = "GAME_COMPLETED";
export const REPLAY_GAME = "REPLAY_GAME";
export const SET_EXPECTD_ANSWERS = "SET_EXPECTD_ANSWERS";
export const CLEAR_INCORRECT_SELECTION_STATUS =
  "CLEAR_INCORRECT_SELECTION_STATUS";

interface SetNoOfCardsAction {
  type: typeof SET_NO_OF_CARDS;
  payload: number;
}

interface SetUniqueRandomNumbersAction {
  type: typeof SET_UNIQUE_RANDOM_NUMBERS;
  payload: Omit<Card, "incorrectSelection">[];
}

interface SetExpectedAnswersAction {
  type: typeof SET_EXPECTD_ANSWERS;
  payload: number[];
}

interface GameStartedAction {
  type: typeof GAME_STARTED;
}

interface ValidCardClickedAction {
  type: typeof VALID_CARD_CLICKED;
  payload: number;
}

interface InvalidCardClickedAction {
  type: typeof INVALID_CARD_CLICKED;
  payload: number;
}

interface ClearIncorrectSelectionStatusAction {
  type: typeof CLEAR_INCORRECT_SELECTION_STATUS;
}

interface IncrementTotalSelectionErrorAction {
  type: typeof INCR_TOTAL_SELECTION_ERROR;
}

interface GameCompletedAction {
  type: typeof GAME_COMPLETED;
}

interface ReplayGameAction {
  type: typeof REPLAY_GAME;
}

type GameActionTypes =
  | SetNoOfCardsAction
  | SetUniqueRandomNumbersAction
  | SetExpectedAnswersAction
  | GameStartedAction
  | ClearIncorrectSelectionStatusAction
  | ValidCardClickedAction
  | InvalidCardClickedAction
  | IncrementTotalSelectionErrorAction
  | GameCompletedAction
  | ReplayGameAction;

export type { GameActionTypes };
