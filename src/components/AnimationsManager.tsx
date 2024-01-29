import { useEffect } from "react";
import color from "../assets/color.png";
import full from "../assets/full.png";
import kareta from "../assets/kareta.png";
import poker from "../assets/poker.png";
import royal from "../assets/royal.png";
import AnimationBox from "./AnimationBox";
import { AnimationsManagerType } from "../data/types";
import { useSoundContext } from "../context/SoundContext";

const AnimationsManager = (props: AnimationsManagerType) => {
  const {
    sortedWithFlush,
    sortedWithFullHouse,
    sortedWithFourOfAKind,
    sortedWithStraightFlush,
    sortedWithRoyalFlush,
    currentAnimation,
    setCurrentAnimation,
  } = props;
  const { playSound } = useSoundContext();

  const DURATION: number = 2000;
  const ROYAL_FLUSH_DURATION: number = 20000;

  let timeout: any;

  useEffect(() => {
    playSound(currentAnimation - 1);
    timeout = setTimeout(
      () => {
        setCurrentAnimation(0);
      },
      currentAnimation < 5 ? DURATION : ROYAL_FLUSH_DURATION
    );

    return () => clearTimeout(timeout);
  }, []);

  if (currentAnimation === 1)
    return <AnimationBox data={sortedWithFlush} image={color} />;

  if (currentAnimation === 2)
    return <AnimationBox data={sortedWithFullHouse} image={full} />;

  if (currentAnimation === 3)
    return <AnimationBox data={sortedWithFourOfAKind} image={kareta} />;

  if (currentAnimation === 4)
    return <AnimationBox data={sortedWithStraightFlush} image={poker} />;

  if (currentAnimation === 5)
    return <AnimationBox data={sortedWithRoyalFlush} image={royal} />;
};

export default AnimationsManager;
