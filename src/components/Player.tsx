import Card from "./Card";

const Player = (props: any) => {
  const { data } = props;

  return (
    <div id="player" className={data.turn ? "turn" : ""}>
      <div id="player-info">
        <span>
          {data.nick} - {data.points} points{" "}
          {data.additionalPoints > 0 && ` (+${data.additionalPoints})`}
        </span>
        {data.cardSetType && <div>{data.cardSetType}</div>}
      </div>
      <div id="player-cards">
        {data.cards.map((el: any) => (
          <Card key={el} value={el} hidden={!data.cardSetType} />
        ))}
      </div>
    </div>
  );
};

export default Player;
