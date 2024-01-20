import { useGameContext } from "../context/GameContext";
import { useNotificationsContext } from "../context/NotificationsContext";
import { ReducerActions } from "../data/enums";

const GameTopBar = (props: any) => {
  const { gameDispatch } = useGameContext();
  const { addNotification } = useNotificationsContext();
  const { socket, roomId, isRoundStarted, isRoomOwner, currentRound } = props;

  return (
    <div id="game-top-bar">
      <div>
        <button
          onClick={() => {
            gameDispatch({ type: ReducerActions.RESET });
          }}
        >
          Go back
        </button>
        {!isRoundStarted && isRoomOwner && (
          <>
            <button onClick={() => socket.emit("client-stop-game")}>
              Finish game
            </button>
            <button onClick={() => socket.emit("client-start-round")}>
              Start round
            </button>
          </>
        )}
      </div>
      <div>
        <button>Audio</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(roomId);
            addNotification("Copied room ID number");
          }}
        >
          ID: {roomId}
        </button>
      </div>
      <div>Round {currentRound}</div>
    </div>
  );
};

export default GameTopBar;
