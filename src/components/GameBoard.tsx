import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { useUserContext } from "../context/UserContext";
import GameBottomBar from "./GameBottomBar";
import GameTopBar from "./GameTopBar";
import SwipeCards from "./SwipeCards";
import GameContent from "./GameContent";
import { PlayerType, RoomType } from "../data/types";
import AnimationsManager from "./AnimationsManager";

const GameBoard = (props: any) => {
  const { gameState } = useGameContext();
  const { userState } = useUserContext();
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
    (el: PlayerType) => el.cardSetType === "POKER KRÓLEWSKI"
  );
  const sortedWithStraightFlush = roomState.players.filter(
    (el: PlayerType) => el.cardSetType === "POKER"
  );
  const sortedWithFourOfAKind = roomState.players.filter(
    (el: PlayerType) => el.cardSetType === "KARETA"
  );
  const sortedWithFullHouse = roomState.players.filter(
    (el: PlayerType) => el.cardSetType === "FULL"
  );
  const sortedWithFlush = roomState.players.filter(
    (el: PlayerType) => el.cardSetType === "KOLOR"
  );

  const handleAnimationAndPlaySound = () => {
    if (sortedWithRoyalFlush.length > 0) return setCurrentAnimation(5);
    if (sortedWithStraightFlush.length > 0) return setCurrentAnimation(4);
    if (sortedWithFourOfAKind.length > 0) return setCurrentAnimation(3);
    if (sortedWithFullHouse.length > 0) return setCurrentAnimation(2);
    if (sortedWithFlush.length > 0) return setCurrentAnimation(1);
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
