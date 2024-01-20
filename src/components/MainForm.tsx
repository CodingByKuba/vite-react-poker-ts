import { BsServer, BsArrowRightCircleFill } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { ReducerActions, URL } from "../data/enums";
import { useFetchContext } from "../context/FetchContext";
import Loader from "./Loader";
import config from "../data/config";
import { useGameContext } from "../context/GameContext";
import { useNotificationsContext } from "../context/NotificationsContext";

const MainForm = () => {
  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();
  const { gameDispatch } = useGameContext();
  const { addNotification } = useNotificationsContext();

  const handleCreateRoom = () => {
    if (!userState.nick) return addNotification("Enter your nick");
    if (!userState.roomId || userState.roomId.length !== 6)
      return addNotification("Room ID is not correct");
    fetchCallback({
      url: URL.room,
      method: "POST",
      timeout: 5000,
      payload: {
        roomId: userState.roomId,
        id: userState.id,
        nick: userState.nick,
        startFromCard: userState.roomOptions.startFromCard,
        pointsSet: [
          userState.roomOptions.pointsHighCard,
          userState.roomOptions.pointsPair,
          userState.roomOptions.pointsDoublePair,
          userState.roomOptions.pointsThree,
          userState.roomOptions.pointsStraight,
          userState.roomOptions.pointsFlush,
          userState.roomOptions.pointsFull,
          userState.roomOptions.pointsFour,
          userState.roomOptions.pointsStraightFlush,
          userState.roomOptions.pointsRoyalFlush,
        ],
        appVersion: config.APP_VERSION,
      },
      successCallback: (response: any) => {
        if (response.data.error) return addNotification(response.data.error);
        gameDispatch({
          type: ReducerActions.SET_ROOM_STATE,
          payload: response.data,
        });
      },
      errorCallback: (error: any) => addNotification(error.message),
    });
  };

  const handleJoinRoom = () => {
    if (!userState.nick) return addNotification("Enter your nick");
    if (!userState.roomId || userState.roomId.length !== 6)
      return addNotification("Room ID is not correct");
    fetchCallback({
      url: URL.room,
      method: "PUT",
      timeout: 5000,
      payload: {
        roomId: userState.roomId,
        id: userState.id,
        nick: userState.nick,
        appVersion: config.APP_VERSION,
      },
      successCallback: (response: any) => {
        if (response.data.error) return addNotification(response.data.error);
        gameDispatch({
          type: ReducerActions.SET_ROOM_STATE,
          payload: response.data,
        });
      },
      errorCallback: (error: any) => addNotification(error.message),
    });
  };

  return (
    <div id="form">
      <input
        type="text"
        name="name"
        autoComplete="true"
        placeholder="Nick..."
        maxLength={25}
        className="centered"
        value={userState.nick}
        onChange={(e) => {
          userDispatch({
            type: ReducerActions.SET_NICK,
            payload: e.target.value,
          });
        }}
      />
      <input
        type="number"
        min={100000}
        max={999999}
        name="id"
        autoComplete="true"
        placeholder="Room ID..."
        className="centered"
        value={userState.roomId}
        onChange={(e) => {
          if (parseInt(e.target.value) > 999999) return;
          userDispatch({
            type: ReducerActions.SET_ROOM,
            payload:
              parseInt(e.target.value).toString() === "NaN"
                ? ""
                : parseInt(e.target.value).toString(),
          });
        }}
      />
      {isPending ? (
        <Loader />
      ) : (
        <div id="buttons">
          <button onClick={handleCreateRoom}>
            <BsServer /> Host
          </button>
          <button onClick={handleJoinRoom}>
            <BsArrowRightCircleFill /> Join
          </button>
        </div>
      )}
    </div>
  );
};

export default MainForm;
