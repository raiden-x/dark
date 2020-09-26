import * as ws from 'ws';
import { Server } from 'http';

import { WebsocketRequestHeaders, Connection } from '../Types/websocket';

import addMessaging from './messaging';
import verifyConnection from './auth';

import {
  addToActiveConnection,
  markUserAsActive,
  removeFromActiveConnection,
  initializeCache,
} from './session';

export default function initializeWebsocket(server: Server): void {
  const wss = new ws.Server({ noServer: true });
  initializeCache();

  server.on('upgrade', function (request, socket, head): void {
    verifyConnection(request)
      .then((userId) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
          request.headers[WebsocketRequestHeaders.USER_ID] = userId;
          wss.emit('connection', ws, request);
        });
      })
      .catch(() => {
        socket.destroy();
      });
  });

  wss.on('connection', (ws: Connection, req: any) => {
    const userId = req.headers[WebsocketRequestHeaders.USER_ID] ?? '';
    const connection = addToActiveConnection(userId, ws);
    ws.on('pong', () => void markUserAsActive(ws));
    ws.on('close', () => removeFromActiveConnection(connection));
    addMessaging(wss, ws);
  });

  const statusInterval = setInterval(function ping() {
    wss.clients.forEach((connection) => {
      connection.ping();
    });
  }, 5000);

  const killInterval = setInterval(function ping() {
    (wss.clients as Set<Connection>).forEach((connection) => {
      !connection.isAlive ? removeFromActiveConnection(connection) : null;
      connection.isAlive = false;
    });
  }, 30000);

  wss.on('close', function close() {
    clearInterval(statusInterval);
    clearInterval(killInterval);
  });
}
