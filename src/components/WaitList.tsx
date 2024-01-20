import { useGameContext } from "../context/GameContext";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

const WaitList = (props: any) => {
  const { gameState, gameDispatch } = useGameContext();
  const { userState } = useUserContext();
  const { socket } = props;

  const readyState = gameState.roomState.players.filter(
    (el: any) => el.id === userState.id
  )[0].ready;

  const allPlayersReady =
    gameState.roomState.players.filter((el: any) => el.ready === false)
      .length === 0;

  const isRoomOwner = gameState.roomState.roomOwner === userState.id;

  const isMinTwoPlayers = gameState.roomState.players.length >= 2;

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
        {allPlayersReady && isRoomOwner && isMinTwoPlayers && (
          <button
            onClick={() => {
              socket.emit("client-start-game");
            }}
          >
            Start game
          </button>
        )}
      </nav>

      {isRoomOwner && (
        <>
          <span>
            {!isMinTwoPlayers
              ? "Not enough players"
              : gameState.roomState.players.length ===
                gameState.roomState.maxPlayers
              ? allPlayersReady
                ? "Time to start!"
                : "Waiting for ready players..."
              : allPlayersReady
              ? "Time to start!"
              : "Waiting for players..."}
          </span>
          <span>
            ({gameState.roomState.players.length}/
            {gameState.roomState.maxPlayers})
          </span>
        </>
      )}

      <hr />
      {gameState.roomState.players.map((el: any) => (
        <div
          key={el.id}
          className={`${el.ready ? "ready" : ""} ${
            gameState.roomState.roomOwner === el.id ? "owner" : ""
          } ${userState.id === el.id ? "you" : ""}`}
        >
          {el.nick}
        </div>
      ))}
    </div>
  );
};

export default WaitList;
