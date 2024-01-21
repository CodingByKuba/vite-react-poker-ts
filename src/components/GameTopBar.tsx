import { useGameContext } from "../context/GameContext";
import { useNotificationsContext } from "../context/NotificationsContext";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import { getCurrentSoundFromName } from "../data/utils";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";

const GameTopBar = (props: any) => {
  const { userState, userDispatch } = useUserContext();
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
            <button
              onClick={() => {
                if (!confirm("Do you want to finish game?")) return;
                socket.emit("client-stop-game");
              }}
            >
              Finish game
            </button>
            <button onClick={() => socket.emit("client-start-round")}>
              Start round
            </button>
          </>
        )}
      </div>
      <div>
        <button
          onClick={() =>
            userDispatch({ type: ReducerActions.SET_OPTIONS_SOUNDFROM })
          }
        >
          {userState.soundFrom > 0 ? (
            <BsFillVolumeUpFill />
          ) : (
            <BsFillVolumeMuteFill />
          )}{" "}
          {getCurrentSoundFromName(userState.soundFrom)}
        </button>
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
