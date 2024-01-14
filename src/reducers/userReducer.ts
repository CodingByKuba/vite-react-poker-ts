import { ReducerActions } from "../data/enums";
import { userInitialState } from "../data/initialState";
import {
  ReducerActionType,
  UserInitialStateType,
  RoomOptionsType,
} from "../data/types";

const userReducer = (
  state: UserInitialStateType = userInitialState,
  action: ReducerActionType
) => {
  switch (action.type) {
    case ReducerActions.SET_SERVER_ALIVE:
      return {
        ...state,
        serverAlive: action.payload.serverAlive || state.serverAlive,
      };
    case ReducerActions.SET_ID:
      return { ...state, id: action.payload };
    case ReducerActions.SET_NICK:
      return { ...state, nick: action.payload };
    case ReducerActions.SET_ROOM:
      return { ...state, roomId: action.payload };
    case ReducerActions.SET_SOCKET_ID:
      return { ...state, socketId: action.payload };
    case ReducerActions.SET_OPTIONS_STARTCARD:
      return {
        ...state,
        roomOptions: {
          ...state.roomOptions,
          startFromCard:
            parseInt(action.payload) > 9
              ? 0
              : parseInt(action.payload) < 0
              ? 9
              : parseInt(action.payload),
        },
      };
    case ReducerActions.SET_OPTIONS_POINTSSET:
      if (
        isNaN(action.payload.position) ||
        action.payload.position < 0 ||
        action.payload.position > 9 ||
        parseInt(action.payload.points) < 0 ||
        parseInt(action.payload.points) > 1000000
      )
        return state;
      return {
        ...state,
        roomOptions: {
          ...state.roomOptions,
          pointsHighCard:
            action.payload.position == 0
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsHighCard,
          pointsPair:
            action.payload.position == 1
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsPair,
          pointsDoublePair:
            action.payload.position == 2
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsDoublePair,
          pointsThree:
            action.payload.position == 3
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsThree,
          pointsStraight:
            action.payload.position == 4
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsStraight,
          pointsFlush:
            action.payload.position == 5
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsFlush,
          pointsFull:
            action.payload.position == 6
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsFull,
          pointsFour:
            action.payload.position == 7
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsFour,
          pointsStraightFlush:
            action.payload.position == 8
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsStraightFlush,
          pointsRoyalFlush:
            action.payload.position == 9
              ? parseInt(action.payload.points).toString() == "NaN"
                ? ""
                : parseInt(action.payload.points).toString()
              : state.roomOptions.pointsRoyalFlush,
        },
      };
    case ReducerActions.SET_OPTIONS_SHOWPOINTS:
      if (state.showPoints == true) return { ...state, showPoints: false };
      return { ...state, showPoints: true };
    case ReducerActions.LOAD_ROOM_OPTIONS:
      if (!action.payload || typeof action.payload != "object") return state;
      return { ...state, roomOptions: action.payload as RoomOptionsType };
    case ReducerActions.SET_OPTIONS_SOUNDFROM:
      if (state.soundFrom == 5) return { ...state, soundFrom: 0 };
      return { ...state, soundFrom: state.soundFrom + 1 };
    case ReducerActions.RESET:
      return userInitialState;
    default:
      return state;
  }
};

export default userReducer;
