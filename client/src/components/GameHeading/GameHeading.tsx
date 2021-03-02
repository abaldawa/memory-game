import React from "react";
import classes from "./GameHeading.module.css";

interface GameHeadingProps {
  text: string;
  children?: never;
}

const GameHeading: React.FC<GameHeadingProps> = (props) => {
  return <div className={classes["game-heading"]}>{props.text}</div>;
};

export default GameHeading;
