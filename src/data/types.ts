export type ReducerActionType = {
  type: number;
  payload?: any;
};

export type FetchContextType = {
  isPending: boolean;
  fetchCallback: (arg?: any) => void;
};

export type FetchProviderType = {
  children?: React.ReactNode;
};

export type FetchCallbackArguments = {
  url: string;
  method: string;
  timeout: number;
  payload: any;
  successCallback: (arg: any) => void;
  errorCallback: (arg: any) => void;
};

export type UserProviderType = {
  children?: React.ReactNode;
};

export type RoomOptionsType = {
  startFromCard: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  pointsHighCard: string;
  pointsPair: string;
  pointsDoublePair: string;
  pointsThree: string;
  pointsStraight: string;
  pointsFlush: string;
  pointsFull: string;
  pointsFour: string;
  pointsStraightFlush: string;
  pointsRoyalFlush: string;
};

export type UserInitialStateType = {
  serverAlive: boolean;
  id: string;
  nick: string;
  roomId: string;
  roomOptions: RoomOptionsType;
  showPoints: boolean;
  soundFrom: 0 | 1 | 2 | 3 | 4 | 5;
};

export type GameInitialStateType = {
  socketId: string;
  roomState: RoomType | {};
};

export type RoomOptionsComponentType = {
  visible: boolean;
  setRoomOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CardComponentType = {
  value: string;
  selected?: boolean;
  hidden?: boolean;
  onClick?: () => React.SetStateAction<number>;
};

export type NotificationType = {
  id: string;
  message: string;
};

export type PlayerType = {
  additionalPoints: number;
  cardSetType: string;
  cards: string[];
  cardsChanged?: boolean;
  id: string;
  nick: string;
  points: number;
  pointsSet?: number[];
  ready: boolean;
  turn: boolean;
};

export type RoomType = {
  cardSet?: number;
  gameStarted: boolean;
  id: string;
  maxPlayers: number;
  players: PlayerType[];
  roomOwner: Pick<PlayerType, "id">;
  roundCount: number;
  roundStarted: boolean;
};

export type AnimationBoxType = {
  data: PlayerType[];
  image: string;
};
