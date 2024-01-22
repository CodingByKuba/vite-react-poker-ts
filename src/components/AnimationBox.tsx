import { AnimationBoxType, PlayerType } from "../data/types";
import { parseCardCode } from "../data/utils";
import Card from "./Card";

const AnimationBox = (props: AnimationBoxType) => {
  const { data, image } = props;
  const isRoyalFlush = data[0]?.cardSetType === "POKER KRÓLEWSKI";

  return (
    <div id="animation-box" className={isRoyalFlush ? "royal-flush" : ""}>
      <div id="animation" className={isRoyalFlush ? "royal-flush" : ""}>
        <img src={image} />
        <div id="nick">
          {data.map((el: PlayerType) => (
            <span key={el.id}>{el.nick}</span>
          ))}
        </div>
        <div id="symbols">
          {data[0].cards.map((el: string) => {
            let parsedElement = parseCardCode(el);

            return isRoyalFlush ? (
              <Card value={el} />
            ) : (
              <span className={parsedElement[2]}>{parsedElement[1]}</span>
            );
          })}
        </div>
      </div>
      {isRoyalFlush && (
        <div id="royal-symbols">
          <span className="red">♥</span>
          <span className="black">♣</span>
          <span className="black">♠</span>
          <span className="red">♦</span>
        </div>
      )}
    </div>
  );
};

export default AnimationBox;
