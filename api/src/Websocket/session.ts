import ws from 'ws';
import NodeCache from 'node-cache';

import { ActiveConnections, Connection, UserConnections } from '../Types/websocket';
import { sendStatusChange } from './messaging';
import { UserStatus } from '../Types/userPreference';
import { generateRandomNumber } from '../Utils/crypto';

export const userConnection: UserConnections = {};
const userStatusCache = new NodeCache({ stdTTL: 10000 });

export function getUserIdFromConnectionId(connectionId: string): string {
  return connectionId.slice(4);
}

export function addToActiveConnection(userId: string, ws: Connection): Connection {
  const randomId: string = generateRandomNumber();
  const connectionId = `${randomId}${userId}`;
  ws.userId = userId;
  ws.connectionId = connectionId;
  addToUserConnection(ws);
  markUserAsActive(userId);
  return ws;
}

function markUserAsActive(userId: string): void {
  if (!userStatusCache.has(userId)) {
    return;
  }
  userStatusCache.set(userId, true);
  void sendStatusChange(UserStatus.ONLINE, userId);
}

function touchRecord(userId: string): void {
  
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

export function initializeCache(): void {
  userStatusCache.on('expired', (userId) => void sendStatusChange(UserStatus.OFFLINE, userId));
}
