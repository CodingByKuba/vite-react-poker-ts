import { PlayerType } from "../data/types";
import Player from "./Player";

const GameContent = (props: any) => {
  const { players } = props;

  return (
    <div id="game-content">
      {players.map((el: PlayerType) => (
        <Player key={el.id} data={el} />
      ))}
    </div>
  );
};

export default GameContent;
