import { useGameContext } from "../context/GameContext";
import { useSocket } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

const WaitList = (props: any) => {
  const { gameState, gameDispatch } = useGameContext();
  const { userState } = useUserContext();
  const socket: any = useSocket();

  const readyState = gameState.roomState.players.filter(
    (el: any) => el.id === userState.id
  )[0].ready;

  return (
    <div id="wait-list">
      <nav>
        <button
          onClick={() => {
            gameDispatch({ type: ReducerActions.RESET });
          }}
        >
          Go back
        </button>
        <button
          onClick={() => {
            socket.emit("client-switch-ready");
          }}
        >
          {readyState ? "Ready" : "Not ready"}
        </button>
      </nav>

      <span>Waiting for players...</span>
      <hr />
      {gameState.roomState.players.map((el: any) => (
        <div className={el.ready ? "ready" : ""}>{el.nick}</div>
      ))}
    </div>
  );
};

export default WaitList;
