import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useUserContext } from "../context/UserContext";
import { useFetchContext } from "../context/FetchContext";
import { ReducerActions } from "../data/enums";

const CheckServerAlive = () => {
  const { userDispatch } = useUserContext();
  const { isPending, fetchCallback } = useFetchContext();

  const [fetchError, setFetchError] = useState<string>("");

  const handleCheckServerAlive = () => {
    setFetchError("");
    fetchCallback({
      method: "GET",
      timeout: 5000,
      successCallback: (response: any) => {
        if (response.data.server)
          return userDispatch({
            type: ReducerActions.SET_DATA,
            payload: { serverAlive: true },
          });
        if (response.data.error) setFetchError(response.data.error);
      },
      errorCallback: (error: any) => setFetchError(error.message),
    });
  };

  useEffect(() => {
    handleCheckServerAlive();
  }, []);

  return (
    <div id="server-check">
      {isPending ? (
        <>
          Connecting to server...
          <Loader />
        </>
      ) : (
        <>
          {fetchError && fetchError}
          <button onClick={handleCheckServerAlive}>Connect to server...</button>
        </>
      )}
    </div>
  );
};

export default CheckServerAlive;
