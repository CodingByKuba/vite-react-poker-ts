import { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
import { useUserContext } from "../context/UserContext";
import GameBottomBar from "./GameBottomBar";
import GameTopBar from "./GameTopBar";
import SwipeCards from "./SwipeCards";
import GameContent from "./GameContent";
import { RoomType } from "../data/types";
import { useSoundContext } from "../context/SoundContext";

const GameBoard = (props: any) => {
  const { gameState } = useGameContext();
  const { userState } = useUserContext();
  const { playSound } = useSoundContext();
  const { socket } = props;

  const [selectedCards, setSelectedCards] = useState<number[]>([]);

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

  const handlePlaySound = () => {
    if (sortedWithRoyalFlush.length > 0) return playSound(4);
    if (sortedWithStraightFlush.length > 0) return playSound(3);
    if (sortedWithFourOfAKind.length > 0) return playSound(2);
    if (sortedWithFullHouse.length > 0) return playSound(1);
    if (sortedWithFlush.length > 0) return playSound(0);
  };

  useEffect(() => {
    handlePlaySound();
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
    </div>
  );
};

export default GameBoard;
