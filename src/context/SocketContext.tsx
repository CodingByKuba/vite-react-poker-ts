import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

import config from "../data/config";
import { useUserContext } from "./UserContext";

const SocketContext = React.createContext(undefined);

type SocketContextProviderType = { children: React.ReactNode };

export const SocketContextProvider = ({
  children,
}: SocketContextProviderType) => {
  const [socket, setSocket] = useState<any>();
  const { userState } = useUserContext();

  useEffect((): any => {
    const newSocket = io(config.SERVER, {
      query: {
        id: userState.id,
        nick: userState.nick,
        roomId: userState.roomId,
      },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [userState.id, userState.nick, userState.roomId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
