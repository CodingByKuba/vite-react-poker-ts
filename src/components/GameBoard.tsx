import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { useUserContext } from "../context/UserContext";
import GameBottomBar from "./GameBottomBar";
import GameTopBar from "./GameTopBar";
import SwipeCards from "./SwipeCards";
import GameContent from "./GameContent";
import { RoomType } from "../data/types";
import { useSoundContext } from "../context/SoundContext";
import AnimationsManager from "./AnimationsManager";

const GameBoard = (props: any) => {
  const { gameState } = useGameContext();
  const { userState } = useUserContext();
  const { playSound } = useSoundContext();
  const { socket } = props;

  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState<number>(0);

  const roomState: RoomType = gameState.roomState;
  const roomId = roomState.id;
  const isRoundStarted = roomState.roundStarted;
  const isRoomOwner = userState.id === roomState.roomOwner;
  const currentRound = roomState.roundCount;
  const roundReadyToBeFinished =
    roomState.players.filter((el: any) => el.turn === true).length === 0;

  const players = roomState.players.filter((el: any) => el.id !== userState.id);

  const YOU = roomState.players.filter((el: any) => el.id === userState.id)[0];
  const myCards = YOU.cards;
  const myTurn = YOU.turn;
  const additionalPoints = YOU.additionalPoints;
  const cardSet = YOU.cardSetType;
  const myPoints = YOU.points;

  const sortedWithRoyalFlush = roomState.players.filter(
    (el: any) => el.cardSetType === "POKER KRÓLEWSKI"
  );
  const sortedWithStraightFlush = roomState.players.filter(
    (el: any) => el.cardSetType === "POKER"
  );
  const sortedWithFourOfAKind = roomState.players.filter(
    (el: any) => el.cardSetType === "KARETA"
  );
  const sortedWithFullHouse = roomState.players.filter(
    (el: any) => el.cardSetType === "FULL"
  );
  const sortedWithFlush = roomState.players.filter(
    (el: any) => el.cardSetType === "KOLOR"
  );

  const handleAnimationAndPlaySound = () => {
    if (sortedWithRoyalFlush.length > 0) {
      setCurrentAnimation(5);
      playSound(4);
      return;
    }
    if (sortedWithStraightFlush.length > 0) {
      setCurrentAnimation(4);
      playSound(3);
      return;
    }
    if (sortedWithFourOfAKind.length > 0) {
      setCurrentAnimation(3);
      playSound(2);
      return;
    }
    if (sortedWithFullHouse.length > 0) {
      setCurrentAnimation(2);
      playSound(1);
      return;
    }
    if (sortedWithFlush.length > 0) {
      setCurrentAnimation(1);
      playSound(0);
      return;
    }
  };

  useEffect(() => {
    handleAnimationAndPlaySound();
  }, [roomState]);

  return (
    <div id="game">
      <GameTopBar
        socket={socket}
        roomId={roomId}
        isRoundStarted={isRoundStarted}
        isRoomOwner={isRoomOwner}
        currentRound={currentRound}
      />
      <GameContent players={players} />
      <GameBottomBar
        socket={socket}
        myCards={myCards}
        myTurn={myTurn}
        isRoomOwner={isRoomOwner}
        isRoundStarted={isRoundStarted}
        roundReadyToBeFinished={roundReadyToBeFinished}
        myPoints={myPoints}
        additionalPoints={additionalPoints}
        cardSet={cardSet}
        selectedCards={selectedCards}
        setSelectedCards={setSelectedCards}
      />
      {myTurn && (
        <SwipeCards
          socket={socket}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
        />
      )}
      {currentAnimation > 0 && (
        <AnimationsManager
          sortedWithRoyalFlush={sortedWithRoyalFlush}
          sortedWithStraightFlush={sortedWithStraightFlush}
          sortedWithFourOfAKind={sortedWithFourOfAKind}
          sortedWithFullHouse={sortedWithFullHouse}
          sortedWithFlush={sortedWithFlush}
          currentAnimation={currentAnimation}
          setCurrentAnimation={setCurrentAnimation}
        />
      )}
    </div>
  );
};

export default GameBoard;
