export interface Status {
  username: string;
  userStatus: UserStatus;
}

export enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
