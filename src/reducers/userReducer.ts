import { ReducerActions } from "../data/enums";
import { userInitialState } from "../data/initialState";
import { ReducerActionType, UserInitialStateType } from "../data/types";

const userReducer = (
  state: UserInitialStateType = userInitialState,
  action: ReducerActionType
) => {
  switch (action.type) {
    case ReducerActions.SET_DATA:
      return {
        ...state,
        serverAlive: action.payload.serverAlive || state.serverAlive,
      };
    default:
      return state;
  }
};

export default userReducer;
