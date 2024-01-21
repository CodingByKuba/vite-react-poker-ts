import { AnimationBoxType, PlayerType } from "../data/types";

const AnimationBox = (props: AnimationBoxType) => {
  const { data, image } = props;

  return (
    <div id="animation-box">
      <div id="animation">
        <img src={image} />
        <div id="nick">
          {data.map((el: PlayerType) => (
            <span key={el.id}>{el.nick}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimationBox;
