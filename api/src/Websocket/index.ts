import * as ws from 'ws';
import { Server } from 'http';

import { WebsocketRequestHeaders } from '../Types/websocket';
import addMessaging from './messaging';
import verifyConnection from './auth';

import {
  addToActiveConnection,
  markAsActiveConnection,
  markAsInactiveConnection,
  getAllConnections,
  removeFromActiveConnection,
} from './session';

export default function initializeWebsocket(server: Server): void {
  const wss = new ws.Server({ noServer: true });

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

  wss.on('connection', (ws: ws, req: any) => {
    const userId = req.headers[WebsocketRequestHeaders.USER_ID] ?? '';
    const connection = addToActiveConnection(userId, ws);
    ws.on('pong', () => markAsActiveConnection(connection));
    ws.on('close', () => removeFromActiveConnection(connection));
    addMessaging(wss, ws);
  });

  const pingInterval = setInterval(function ping() {
    getAllConnections().forEach((connection) => {
      markAsInactiveConnection(connection);
      connection.socket.ping();
    });
  }, 5000);

  wss.on('close', function close() {
    clearInterval(pingInterval);
  });
}
