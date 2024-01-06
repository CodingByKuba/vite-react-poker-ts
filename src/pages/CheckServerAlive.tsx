import Loader from "../components/Loader";

const CheckServerAlive = () => {
  return (
    <div id="server-check">
      Connecting to server...
      <Loader />
    </div>
  );
};

export default CheckServerAlive;
