import { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { useUserContext } from "../context/UserContext";
import GameBottomBar from "./GameBottomBar";
import GameTopBar from "./GameTopBar";
import SwipeCards from "./SwipeCards";

const GameBoard = (props: any) => {
  const { gameState } = useGameContext();
  const { userState } = useUserContext();
  const { socket } = props;

  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const roomState = gameState.roomState;
  const roomId = roomState.id;
  const isRoundStarted = roomState.roundStarted;
  const isRoomOwner = userState.id === roomState.roomOwner;
  const currentRound = roomState.roundCount;
  const roundReadyToBeFinished =
    roomState.players.filter((el: any) => el.turn === true).length === 0;

  const YOU = roomState.players.filter((el: any) => el.id === userState.id)[0];
  const myCards = YOU.cards;
  const myTurn = YOU.turn;
  const additionalPoints = YOU.additionalPoints;
  const cardSet = YOU.cardSetType;
  const myPoints = YOU.points;

  return (
    <div id="game">
      <GameTopBar
        socket={socket}
        roomId={roomId}
        isRoundStarted={isRoundStarted}
        isRoomOwner={isRoomOwner}
        currentRound={currentRound}
      />
      <div id="game-content">players</div>
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
