import { useNotificationsContext } from "../context/NotificationsContext";
import config from "../data/config";
import { NotificationType } from "../data/types";

const NotificationsBox = () => {
  const { notifications, deleteNotification } = useNotificationsContext();

  if (notifications.length === 0) return null;

  return (
    <div id="notifications-box">
      {notifications.map((el: NotificationType) => (
        <div
          key={el.id}
          onClick={() => deleteNotification(el.id)}
          id="notification"
          style={{
            animation: `showAndHide ${(config.NOTIFICATION_TIME / 1000).toFixed(
              1
            )}s linear`,
          }}
        >
          {el.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationsBox;
