import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";
import { RoomOptionsComponentType } from "../data/types";
import { BsArrowLeftCircle } from "react-icons/bs";
import Card from "./Card";
import { countMaxPlayers } from "../data/utils";

const RoomOptions = (props: RoomOptionsComponentType) => {
  const { userState, userDispatch } = useUserContext();

  return (
    <div id="room-options" className={props.visible ? "visible" : undefined}>
      <button
        className="rounded"
        onClick={() => props.setRoomOptionsVisible(false)}
      >
        <BsArrowLeftCircle />
      </button>
      Startuj od karty (max. graczy:{" "}
      {countMaxPlayers(userState.roomOptions.startFromCard)}):
      <Card
        value={userState.roomOptions.startFromCard + 2 + "-H"}
        onClick={() =>
          userDispatch({
            type: ReducerActions.SET_OPTIONS_STARTCARD,
            payload: userState.roomOptions.startFromCard + 1,
          })
        }
      />
      <input
        type="range"
        min={0}
        max={9}
        value={userState.roomOptions.startFromCard}
        onChange={(e) =>
          userDispatch({
            type: ReducerActions.SET_OPTIONS_STARTCARD,
            payload: parseInt(e.target.value),
          })
        }
      />
      Punkty układów kart:
      <div id="cardset-points">
        <div className="column">
          <div className="row">
            WYSOKA KARTA
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsHighCard}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 0,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            DWIE PARY
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsDoublePair}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 2,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            STRIT
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsStraight}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 4,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            FULL
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsFull}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 6,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            POKER
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsStraightFlush}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 8,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="column">
          <div className="row">
            PARA
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsPair}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 1,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            TRÓJKA
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsThree}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 3,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            KOLOR
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsFlush}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 5,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            KARETA
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsFour}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 7,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="row">
            POKER KRÓLEWSKI
            <input
              type="number"
              className="centered"
              min={0}
              value={userState.roomOptions.pointsRoyalFlush}
              onChange={(e) =>
                userDispatch({
                  type: ReducerActions.SET_OPTIONS_POINTSSET,
                  payload: {
                    position: 9,
                    points: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomOptions;
