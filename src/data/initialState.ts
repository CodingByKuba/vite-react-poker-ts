import { GameInitialStateType, UserInitialStateType } from "./types";
import { generateRandomId } from "./utils";

export const userInitialState: UserInitialStateType = {
  serverAlive: false,
  id: generateRandomId(),
  nick: "",
  roomId: "",
  roomOptions: {
    startFromCard: 0,
    pointsHighCard: "1",
    pointsPair: "2",
    pointsDoublePair: "4",
    pointsThree: "5",
    pointsStraight: "8",
    pointsFlush: "15",
    pointsFull: "20",
    pointsFour: "30",
    pointsStraightFlush: "50",
    pointsRoyalFlush: "200",
  },
  showPoints: true,
  soundFrom: 1,
};

export const gameInitialState: GameInitialStateType = {
  socketId: "",
  roomState: {},
};
