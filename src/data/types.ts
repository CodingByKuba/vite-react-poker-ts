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

export type UserInitialStateType = {
  serverAlive: boolean;
};
