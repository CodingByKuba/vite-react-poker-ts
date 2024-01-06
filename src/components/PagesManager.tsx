import { useUserContext } from "../context/UserContext";
import CheckServerAlive from "../pages/CheckServerAlive";

const PagesManager = () => {
  const { userState } = useUserContext();

  if (!userState.serverAlive) return <CheckServerAlive />;

  return <>Next page</>;
};

export default PagesManager;
