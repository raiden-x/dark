import ws from 'ws';
import { Status } from './userPreference';

export interface CustomWebsocket extends ws {
  isAlive: boolean;
  userId: string;
}

export interface ActiveConnections {
  [key: string]: Connection;
}

export interface Connection {
  socket: ws;
  lastAlive: number;
  userId: string;
  connectionId: string;
  isAlive: boolean;
}

export enum WebsocketRequestHeaders {
  USER_ID = 'userId',
}

export interface UserConnections {
  [key: string]: Connection[];
}

export interface MessageBody {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface WebsocketPayload {
  topic: WebsocketTopic;
  body: MessageBody | Status;
}

export enum WebsocketTopic {
  MESSAGE = 'MESSAGE',
  STATUS = 'STATUS',
}

export function isMessageBody(
  obj: MessageBody | Status,
  topic: WebsocketTopic,
): obj is MessageBody {
  return topic === WebsocketTopic.MESSAGE;
}
