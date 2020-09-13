import ws from 'ws';

import { getUsersToNotify } from '../Model/userPreference';

import { WebsocketPayload, WebsocketTopic, isMessageBody } from '../Types/websocket';
import { getConnectionsForUser } from './session';
import { UserStatus } from '../Types/userPreference';

export default function addMessaging(wss: ws.Server, ws: ws): void {
  ws.on('message', (message) => {
    console.log(message);
  });
}

export async function sendStatusChange(status: UserStatus, userId: string): Promise<void> {
  const usersToNotify = await getUsersToNotify(userId);
  const payload: WebsocketPayload = {
    topic: WebsocketTopic.STATUS,
    body: { username: userId, userStatus: status },
  };
  usersToNotify.forEach((user) => {
    getConnectionsForUser(user).forEach((connection) => {
      connection.socket.send(JSON.stringify(payload));
    });
  });
}

export function sendMessageToUser(message: WebsocketPayload): void {
  if (!isMessageBody(message.body, message.topic)) {
    return;
  }
  const toUser = message.body.to;
  getConnectionsForUser(toUser).forEach((connection) => connection.socket.send(message));
}

export function sendStatus(user: UserId, infoUserId: string) {
  const clientConnections = getConnectionsForUser(user);
  
}