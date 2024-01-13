import { useUserContext } from "../context/UserContext";
import CheckServerAlive from "../pages/CheckServerAlive";
import Start from "../pages/Start";

const PagesManager = () => {
  const { userState } = useUserContext();

  if (!userState.serverAlive) return <CheckServerAlive />;

  return <Start />;
};

export default PagesManager;
