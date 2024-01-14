import { createContext, useContext, useReducer } from "react";
import { gameInitialState } from "../data/initialState";
import { UserProviderType } from "../data/types";
import gameReducer from "../reducers/gameReducer";

const defaultValue: any = gameInitialState;

const GameContext = createContext(defaultValue);

export const GameContextProvider: React.FC<UserProviderType> = ({
  children,
}) => {
  const [gameState, gameDispatch] = useReducer<any>(
    gameReducer,
    gameInitialState
  );

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameDispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
