import { ReducerActions } from "../data/enums";
import { gameInitialState } from "../data/initialState";
import { GameInitialStateType, ReducerActionType } from "../data/types";

const gameReducer = (
  state: GameInitialStateType = gameInitialState,
  action: ReducerActionType
) => {
  switch (action.type) {
    case ReducerActions.SET_SOCKET_ID:
      return {
        ...state,
        serverAlive: (action.payload.socketId as string) || "",
      };
    case ReducerActions.SER_ROOM_STATE:
      if (!action.payload || typeof action.payload !== "object") return state;
      return {
        ...state,
        roomState: action.payload,
      };
    case ReducerActions.RESET:
      return gameInitialState;
    default:
      return state;
  }
};

export default gameReducer;
