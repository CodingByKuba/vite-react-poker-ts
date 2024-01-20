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
      Start from card (max{" "}
      {countMaxPlayers(userState.roomOptions.startFromCard)} players):
      <Card value={userState.roomOptions.startFromCard + 2 + "-H"} />
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
      Card set points:
      <div id="cardset-points">
        <div className="column">
          <div className="row">
            HIGH CARD
            <input
              type="number"
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
            TWO PAIRS
            <input
              type="number"
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
            STRAIGHT
            <input
              type="number"
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
            FULL HOUSE
            <input
              type="number"
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
            STRAIGHT FLUSH
            <input
              type="number"
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
            ONE PAIR
            <input
              type="number"
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
            THREE OF A KIND
            <input
              type="number"
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
            FLUSH
            <input
              type="number"
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
            FOUR OF A KIND
            <input
              type="number"
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
            ROYAL FLUSH
            <input
              type="number"
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
