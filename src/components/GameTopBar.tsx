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
            if (!confirm("Czy chcesz wyjść z gry?")) return;
            gameDispatch({ type: ReducerActions.RESET });
          }}
        >
          &nbsp;{"<"}&nbsp;
        </button>
        {!isRoundStarted && isRoomOwner && (
          <button
            onClick={() => {
              if (!confirm("Czy chcesz zakończyć grę?")) return;
              socket.emit("client-stop-game");
            }}
          >
            KONIEC GRY
          </button>
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
            addNotification("Skopiowano numer ID pokoju");
          }}
        >
          ID: {roomId}
        </button>
      </div>
      <div>Runda {currentRound}</div>
    </div>
  );
};

export default GameTopBar;
