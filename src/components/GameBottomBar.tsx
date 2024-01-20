import Card from "./Card";
import { BsBullseye } from "react-icons/bs";

const GameBottomBar = (props: any) => {
  const {
    socket,
    myCards,
    myTurn,
    roundReadyToBeFinished,
    isRoomOwner,
    isRoundStarted,
    myPoints,
    additionalPoints,
    cardSet,
    selectedCards,
    setSelectedCards,
  } = props;

  return (
    <div id="game-bottom-bar">
      <div id="my-cards">
        {myCards.map((el: any, index: number) => (
          <Card
            key={el}
            value={el}
            selected={selectedCards.includes(index)}
            onClick={() =>
              setSelectedCards((prev: number[]) => {
                if (!myTurn) return prev;
                if (prev.includes(index))
                  return selectedCards.filter((card: number) => card !== index);
                return [...prev, index];
              })
            }
          />
        ))}
      </div>
      <div>
        <BsBullseye /> {myPoints} points{" "}
        {additionalPoints > 0 && `(+${additionalPoints})`}
      </div>
      {cardSet && <div id="card-set">{cardSet}</div>}
      {roundReadyToBeFinished && isRoomOwner && isRoundStarted && (
        <div
          id="finish-round"
          onClick={() => socket.emit("client-finish-round")}
        >
          Tap to finish round
        </div>
      )}
    </div>
  );
};

export default GameBottomBar;