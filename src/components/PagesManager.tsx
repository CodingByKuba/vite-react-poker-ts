import { useGameContext } from "../context/GameContext";
import { SocketContextProvider } from "../context/SocketContext";
import { useUserContext } from "../context/UserContext";
import CheckServerAlive from "../pages/CheckServerAlive";
import Game from "../pages/Game";
import Start from "../pages/Start";

const PagesManager = () => {
  const { userState } = useUserContext();
  const { gameState } = useGameContext();

  if (!userState.serverAlive) return <CheckServerAlive />;

  if (!gameState.roomState.id) return <Start />;

  return (
    <SocketContextProvider>
      <Game />
    </SocketContextProvider>
  );
};

export default PagesManager;
