import Card from "./Card";

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
      <div id="my-points">
        <span>
          Twoje punkty: {myPoints}{" "}
          {additionalPoints > 0 && `(+${additionalPoints})`}
        </span>
        {!isRoundStarted && isRoomOwner && (
          <button onClick={() => socket.emit("client-start-round")}>
            NOWA RUNDA
          </button>
        )}
      </div>
      {cardSet && <div id="card-set">{cardSet}</div>}
      {roundReadyToBeFinished && isRoomOwner && isRoundStarted && (
        <div
          id="finish-round"
          onClick={() => socket.emit("client-finish-round")}
        >
          Zakończ rundę...
        </div>
      )}
    </div>
  );
};

export default GameBottomBar;
