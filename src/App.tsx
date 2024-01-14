import PagesManager from "./components/PagesManager";
import { FetchContextProvider } from "./context/FetchContext";
import { GameContextProvider } from "./context/GameContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <FetchContextProvider>
      <UserContextProvider>
        <GameContextProvider>
          <PagesManager />
        </GameContextProvider>
      </UserContextProvider>
    </FetchContextProvider>
  );
};

export default App;
