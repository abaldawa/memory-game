interface Card {
  showCard: boolean;
  value: number;
  incorrectSelection?: boolean;
}

interface UserAnswer {
  selectedCard: number;
  selectionDate: Date;
}

interface GameState {
  noOfCards: number;
  cards?: Card[];
  expectedAnswer?: number[];
  userAnswers: UserAnswer[];
  gameCompleted: boolean;
  gameStarted: boolean;
  totalSelectionError: number;
}

const gameState: GameState = {
  noOfCards: 0,
  userAnswers: [],
  gameCompleted: false,
  gameStarted: false,
  totalSelectionError: 0,
};

export type { Card, UserAnswer, GameState };
export { gameState };
