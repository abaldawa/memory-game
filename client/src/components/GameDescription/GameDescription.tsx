import React from "react";

interface GameDescriptionProps {
  text?: string;
  children?: never;
}

const GameDescription: React.FC<GameDescriptionProps> = (props) => {
  if (props.text) {
    return <h3>{props.text}</h3>;
  } else {
    return null;
  }
};

export default GameDescription;
