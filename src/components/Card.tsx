import { CardComponentType } from "../data/types";
import { parseCardCode } from "../data/utils";

const Card = (props: CardComponentType) => {
  const symbols = parseCardCode(props.value);

  return (
    <div
      id="card"
      className={
        symbols[2] +
        (props.selected ? " selected" : "") +
        (props.hidden ? " hidden" : "")
      }
    >
      <p>{symbols[1]}</p>
      <p>{symbols[0]}</p>
    </div>
  );
};

export default Card;
