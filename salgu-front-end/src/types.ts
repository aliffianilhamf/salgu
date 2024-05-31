export type UserData = {
  sub: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
};

export type Dir = {
  id: string;
  name: string;
  path: string;
  dirChildren?: Dir[];
  fileChildren?: File[];
};

export type File = {
  id: string;
  name: string;
  size: number;
};

export type UsageData = {
  amount: number;
  spendingPerSecond: number;
};

export type Invoice = {
  id: number;
  startedAt: string;
  endedAt: string;
  amount: number;
  paid: boolean;
  isFinal: boolean;
  lastUpdatedAt: string;
  userId: number;
};
