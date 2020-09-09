import ws from 'ws';

import { ActiveConnections, Connection, UserConnections } from '../Types/websocket';
import { sendStatusChange } from './messaging';
import { UserStatus } from '../Types/userPreference';
import { generateRandomNumber } from '../Utils/crypto';

export const connections: ActiveConnections = {};
export const userConnection: UserConnections = {};

export function getUserIdFromConnectionId(connectionId: string): string {
  return connectionId.slice(4);
}

export function addToActiveConnection(userId: string, ws: ws): Connection {
  const randomId: string = generateRandomNumber();
  const connectionId = `${randomId}${userId}`;
  const connection = {
    lastAlive: Date.now(),
    socket: ws,
    userId: getUserIdFromConnectionId(connectionId),
    isAlive: true,
    connectionId,
  };
  addToUserConnection(connection);
  connections[connectionId] = connection;
  void sendStatusChange(UserStatus.ONLINE, userId);
  return connections[connectionId];
}

export function markAsActiveConnection(connection: Connection): void {
  if (!connection.isAlive) {
    console.log('changing to alive');
    void sendStatusChange(UserStatus.ONLINE, connection.userId);
  }
  connection.lastAlive = Date.now();
  connection.isAlive = true;
}

export function markAsInactiveConnection(connection: Connection): void {
  const timeDiff = Date.now() - connection.lastAlive;
  if (timeDiff > 10000 && connection.isAlive) {
    console.log('changing to dead');
    connection.isAlive = false;
    void sendStatusChange(UserStatus.OFFLINE, connection.userId);
  }
}

export function removeFromActiveConnection(connection: Connection): void {
  const connectionId = connection.connectionId;
  const userId = connection.userId;
  connections[connectionId].socket.terminate();
  removeFromUserConnection(connection);
  delete connections[connectionId];
  void sendStatusChange(UserStatus.OFFLINE, userId);
}

export function getAllConnections(): Connection[] {
  return Object.values(connections);
}

export function getConnectionsForUser(userId: string): Connection[] {
  return userConnection[userId] ?? [];
}

function addToUserConnection(connection: Connection): void {
  const userId = connection.userId;
  userConnection[userId]
    ? userConnection[userId].push(connection)
    : (userConnection[userId] = [connection]);
}

function removeFromUserConnection(connection: Connection): void {
  const userId = connection.userId;
  const index = userConnection[userId].findIndex((conn) => connection === conn);
  userConnection[userId].splice(index, 1);
}

export function getUserStatus(userId: string): UserStatus {
  console.log(userConnection);
  return !!userConnection[userId]?.length ? UserStatus.ONLINE : UserStatus.OFFLINE;
}
