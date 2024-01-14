import { useGameContext } from "../context/GameContext";
import { ReducerActions } from "../data/enums";

const Game = () => {
  const { gameDispatch } = useGameContext();

  return (
    <div id="game">
      <button
        onClick={() => {
          gameDispatch({ type: ReducerActions.RESET });
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default Game;
