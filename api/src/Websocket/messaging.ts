import ws from 'ws';

import { getUsersToNotify } from '../Model/userPreference';
import { WebsocketPayload, WebsocketTopic, isMessageBody, MessageBody } from '../Types/websocket';
import { UserStatus, Status } from '../Types/userPreference';
import { Connection } from '../Types/websocket';

import { getConnectionsForUser } from './session';

export default function addMessaging(wss: ws.Server, ws: Connection): void {
  ws.on('message', (message: string) => {
    const payload = JSON.parse(message);
    const body: MessageBody = JSON.parse(payload.body);
    const resp: string = JSON.stringify({
      topic: WebsocketTopic.MESSAGE,
      body: { ...body, from: ws.userId },
    });
    getConnectionsForUser(body.to).forEach((connection) => {
      connection.send(resp);
    });
  });
}

export async function sendStatusChange(status: UserStatus, userId: string): Promise<void> {
  const usersToNotify = await getUsersToNotify(userId);
  const payload: string = JSON.stringify({
    topic: WebsocketTopic.STATUS,
    body: { username: userId, userStatus: status },
  });
  usersToNotify.forEach((user) => {
    getConnectionsForUser(user).forEach((connection) => {
      connection.send(payload);
    });
  });
}

export function sendStatusToUser(addedUserId: string, status: UserStatus, user: string): void {
  const json: WebsocketPayload<Status> = {
    topic: WebsocketTopic.STATUS,
    body: {
      username: addedUserId,
      userStatus: status,
    },
  };
  const payload = JSON.stringify(json);
  getConnectionsForUser(user).forEach((connection) => {
    connection.send(payload);
  });
}

export function sendMessageToUser(message: WebsocketPayload<MessageBody>): void {
  if (!isMessageBody(message.body, message.topic)) {
    return;
  }
  const toUser = message.body.to;
  getConnectionsForUser(toUser).forEach((connection) => void connection.send(message));
}
