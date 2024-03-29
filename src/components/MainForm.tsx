import { BsServer, BsArrowRightCircleFill } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { ReducerActions, STORAGE, URL } from "../data/enums";
import { useFetchContext } from "../context/FetchContext";
import Loader from "./Loader";
import config from "../data/config";
import { useGameContext } from "../context/GameContext";
import { useNotificationsContext } from "../context/NotificationsContext";
import { generateRoomId } from "../data/utils";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

const MainForm = () => {
  const { userState, userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();
  const { gameDispatch } = useGameContext();
  const { addNotification } = useNotificationsContext();

  const [nick, setNick] = useLocalStorage(STORAGE.nick, "");

  useEffect(() => {
    if (nick) {
      userDispatch({ type: ReducerActions.SET_NICK, payload: nick });
    }
  }, []);

  const handleCreateRoom = () => {
    if (!userState.nick) return addNotification("Wprowadź swój nick");
    let currentRoomId = userState.roomId ? userState.roomId : generateRoomId();
    if (!userState.roomId) {
      return userDispatch({
        type: ReducerActions.SET_ROOM,
        payload: currentRoomId.toString(),
      });
    }
    if (userState.roomId.length !== 6)
      return addNotification("Niepoprawne ID pokoju");
    fetchCallback({
      url: URL.room,
      method: "POST",
      timeout: 5000,
      payload: {
        roomId: currentRoomId,
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
    if (!userState.nick) return addNotification("Wprowadź swój nick");
    if (!userState.roomId || userState.roomId.length !== 6)
      return addNotification("Niepoprawne ID pokoju");
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
          setNick(e.target.value);
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
        placeholder="ID pokoju..."
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
            <BsServer /> Hostuj
          </button>
          <button onClick={handleJoinRoom}>
            <BsArrowRightCircleFill /> Dołącz
          </button>
        </div>
      )}
    </div>
  );
};

export default MainForm;
