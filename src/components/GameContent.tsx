import Player from "./Player";

const GameContent = (props: any) => {
  const { players } = props;
  console.log(players);

  return (
    <div id="game-content">
      {players.map((el: any) => (
        <Player key={el.id} data={el} />
      ))}
    </div>
  );
};

export default GameContent;
