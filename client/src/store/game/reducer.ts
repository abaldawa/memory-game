import { gameState, GameState } from "./state";
import {
  GameActionTypes,
  SET_NO_OF_CARDS,
  SET_UNIQUE_RANDOM_NUMBERS,
  SET_EXPECTD_ANSWERS,
  GAME_STARTED,
  VALID_CARD_CLICKED,
  INVALID_CARD_CLICKED,
  GAME_COMPLETED,
  REPLAY_GAME,
  CLEAR_INCORRECT_SELECTION_STATUS,
} from "./actionTypes";

const gameReducer = (state = gameState, action: GameActionTypes): GameState => {
  switch (action.type) {
    case SET_NO_OF_CARDS:
      return {
        ...state,
        noOfCards: action.payload,
        cards: action.payload !== 0 ? state.cards : undefined,
      };
    case SET_UNIQUE_RANDOM_NUMBERS:
      return {
        ...state,
        cards: action.payload,
      };
    case SET_EXPECTD_ANSWERS:
      return {
        ...state,
        expectedAnswer: action.payload,
      };
    case GAME_STARTED:
      return {
        ...state,
        cards: state.cards?.map((card) => ({ ...card, showCard: false })),
        gameStarted: true,
      };
    case VALID_CARD_CLICKED:
      return {
        ...state,
        cards: state.cards?.map((card) => {
          if (card.value === action.payload) {
            return {
              ...card,
              showCard: true,
              incorrectSelection: false,
            };
          }
          return { ...card };
        }),
        userAnswers: [
          ...state.userAnswers,
          { selectedCard: action.payload, selectionDate: new Date() },
        ],
      };
    case INVALID_CARD_CLICKED:
      return {
        ...state,
        cards: state.cards?.map((card) => {
          if (card.value === action.payload) {
            return {
              ...card,
              showCard: false,
              incorrectSelection: true,
            };
          }
          return { ...card };
        }),
        totalSelectionError: state.totalSelectionError + 1,
      };
    case CLEAR_INCORRECT_SELECTION_STATUS:
      return {
        ...state,
        cards: state.cards?.map((card) => {
          return {
            ...card,
            incorrectSelection: false,
          };
        }),
      };
    case GAME_COMPLETED:
      return {
        ...state,
        gameCompleted: true,
      };
    case REPLAY_GAME:
      return gameState;
    default:
      return gameState;
  }
};

export { gameReducer };
