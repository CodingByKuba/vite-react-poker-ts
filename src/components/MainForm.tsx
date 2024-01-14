import { BsServer, BsArrowRightCircleFill } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { ReducerActions } from "../data/enums";

const MainForm = () => {
  const { userState, userDispatch } = useUserContext();

  return (
    <div id="form">
      <input
        type="text"
        name="name"
        placeholder="Nick..."
        maxLength={25}
        className="centered"
        value={userState.nick}
        onChange={(e) => {
          userDispatch({
            type: ReducerActions.SET_NICK,
            payload: e.target.value,
          });
        }}
      />
      <input
        type="number"
        min={100000}
        max={999999}
        placeholder="Room ID..."
        className="centered"
        value={userState.roomId}
        onChange={(e) => {
          if (parseInt(e.target.value) > 999999) return;
          userDispatch({
            type: ReducerActions.SET_ROOM,
            payload:
              parseInt(e.target.value).toString() === "NaN"
                ? ""
                : parseInt(e.target.value).toString(),
          });
        }}
      />
      <div id="buttons">
        <button>
          <BsServer /> Host
        </button>
        <button>
          <BsArrowRightCircleFill /> Join
        </button>
      </div>
    </div>
  );
};

export default MainForm;
