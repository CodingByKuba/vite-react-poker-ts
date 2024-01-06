import PagesManager from "./components/PagesManager";
import { FetchContextProvider } from "./context/FetchContext";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <FetchContextProvider>
      <UserContextProvider>
        <PagesManager />
      </UserContextProvider>
    </FetchContextProvider>
  );
};

export default App;
