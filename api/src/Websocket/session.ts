import Cache from '../Utils/cache';
import { Connection, UserConnections } from '../Types/websocket';
import { UserStatus } from '../Types/userPreference';
import { generateRandomNumber } from '../Utils/crypto';

import { sendStatusChange } from './messaging';

export const userConnection: UserConnections = {};
let userStatusCache: Cache;

export function getUserIdFromConnectionId(connectionId: string): string {
  return connectionId.slice(4);
}

export function addToActiveConnection(userId: string, ws: Connection): Connection {
  const randomId: string = generateRandomNumber();
  const connectionId = `${randomId}${userId}`;
  ws.userId = userId;
  ws.connectionId = connectionId;
  addToUserConnection(ws);
  markUserAsActive(ws);
  return ws;
}

export function removeFromActiveConnection(ws: Connection): void {
  removeFromUserConnection(ws);
  ws.close();
}

export function markUserAsActive(ws: Connection): void {
  const userId = ws.userId;
  ws.isAlive = true;
  if (userStatusCache.has(userId)) {
    userStatusCache.touch(userId);
    return;
  }
  userStatusCache.set(userId, true);
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
  return !!userConnection[userId]?.length ? UserStatus.ONLINE : UserStatus.OFFLINE;
}

export function initializeCache(): void {
  userStatusCache = new Cache({ ttl: 10000 });
  userStatusCache.on('set', (userId) => {
    void sendStatusChange(UserStatus.ONLINE, userId);
  });
  userStatusCache.on('expired', (userId) => {
    void sendStatusChange(UserStatus.OFFLINE, userId);
  });
}
