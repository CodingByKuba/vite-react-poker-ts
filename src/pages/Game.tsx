import { useEffect } from "react";
import WaitList from "../components/WaitList";
import { useGameContext } from "../context/GameContext";
import { useSocket } from "../context/SocketContext";
import { ReducerActions } from "../data/enums";
import { useNotificationsContext } from "../context/NotificationsContext";
import GameBoard from "../components/GameBoard";
import { useUserContext } from "../context/UserContext";

const Game = () => {
  const { userState } = useUserContext();
  const { gameState, gameDispatch } = useGameContext();
  const { addNotification } = useNotificationsContext();
  const socket: any = useSocket();

  useEffect(() => {
    if (socket === null || socket === undefined) return;
    socket.on("server-update-room", (data: any) => {
      gameDispatch({ type: ReducerActions.SET_ROOM_STATE, payload: data.room });
      if (data.swipe) {
        if (userState.id === data.swipe.id) return;
        addNotification(
          data.swipe.nick +
            (data.swipe.cards
              ? " is changing " + data.swipe.cards + " cards"
              : " is not changing cards")
        );
      }
    });
    socket.on("server-toast-notification", (data: string) => {
      addNotification(data);
    });
    socket.on("disconnect", () => {
      gameDispatch({ type: ReducerActions.RESET });
    });
  }, [socket]);

  if (!gameState.roomState.gameStarted) return <WaitList socket={socket} />;

  return <GameBoard socket={socket} />;
};

export default Game;
