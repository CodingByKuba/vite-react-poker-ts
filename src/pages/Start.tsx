import { useState } from "react";
import MainForm from "../components/MainForm";
import RoomOptions from "../components/RoomOptions";
import { BsFillPencilFill } from "react-icons/bs";

const Start = () => {
  const [roomOptionsVisible, setRoomOptionsVisible] = useState<boolean>(false);

  return (
    <main id="start-page">
      <div id="logo"></div>
      <MainForm />
      <div id="options-button-container">
        <button className="rounded" onClick={() => setRoomOptionsVisible(true)}>
          <BsFillPencilFill />
        </button>
      </div>
      <RoomOptions
        visible={roomOptionsVisible}
        setRoomOptionsVisible={setRoomOptionsVisible}
      />
    </main>
  );
};

export default Start;
