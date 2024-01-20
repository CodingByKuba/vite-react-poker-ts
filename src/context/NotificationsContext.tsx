import { createContext, useContext, useState } from "react";
import { NotificationType, UserProviderType } from "../data/types";
import { generateRandomId } from "../data/utils";
import config from "../data/config";

const defaultValue: any = undefined;

const NotificationsContext = createContext(defaultValue);

export const NotificationsContextProvider: React.FC<UserProviderType> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = (message: string) => {
    if (!message) return;
    let timeout;
    const notificationId: string = generateRandomId();

    setNotifications((prev) => [
      ...prev,
      {
        id: notificationId,
        message: message,
      },
    ]);

    timeout = setTimeout(() => {
      setNotifications((prev) => prev.filter((el) => el.id !== notificationId));
    }, config.NOTIFICATION_TIME);
  };

  const deleteNotification = (id: string) => {
    if (!id) return;
    setNotifications((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => useContext(NotificationsContext);
