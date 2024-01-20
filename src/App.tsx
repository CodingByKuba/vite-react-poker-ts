import NotificationsBox from "./components/NotificationsBox";
import PagesManager from "./components/PagesManager";
import { FetchContextProvider } from "./context/FetchContext";
import { GameContextProvider } from "./context/GameContext";
import { NotificationsContextProvider } from "./context/NotificationsContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <FetchContextProvider>
      <UserContextProvider>
        <GameContextProvider>
          <NotificationsContextProvider>
            <PagesManager />
            <NotificationsBox />
          </NotificationsContextProvider>
        </GameContextProvider>
      </UserContextProvider>
    </FetchContextProvider>
  );
};

export default App;
