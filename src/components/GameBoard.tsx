import { useGameContext } from "../context/GameContext";
import { useUserContext } from "../context/UserContext";
import GameTopBar from "./GameTopBar";

const GameBoard = (props: any) => {
  const { gameState } = useGameContext();
  const { userState } = useUserContext();
  const { socket } = props;

  const roomState = gameState.roomState;
  const roomId = roomState.id;
  const isRoundStarted = roomState.roundStarted;
  const isRoomOwner = userState.id === roomState.roomOwner;
  const currentRound = roomState.roundCount;

  return (
    <div id="game">
      <GameTopBar
        socket={socket}
        roomId={roomId}
        isRoundStarted={isRoundStarted}
        isRoomOwner={isRoomOwner}
        currentRound={currentRound}
      />
      <div id="game-content">players</div>
      <div id="game-bottom-bar">my cards</div>
    </div>
  );
};

export default GameBoard;
