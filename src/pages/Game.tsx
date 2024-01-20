import { useEffect } from "react";
import WaitList from "../components/WaitList";
import { useGameContext } from "../context/GameContext";
import { useSocket } from "../context/SocketContext";
import { ReducerActions } from "../data/enums";

const Game = () => {
  const { gameState, gameDispatch } = useGameContext();
  const socket: any = useSocket();

  useEffect(() => {
    if (socket === null || socket === undefined) return;
    socket.on("server-update-room", (data: any) => {
      console.log(data);
      gameDispatch({ type: ReducerActions.SET_ROOM_STATE, payload: data.room });
    });
    socket.on("disconnect", () => {
      gameDispatch({ type: ReducerActions.RESET });
    });
  }, [socket]);

  if (!gameState.roomState.gameStarted) return <WaitList socket={socket} />;

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
