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
  soundFrom: 1 | 2 | 3 | 4 | 5;
};
