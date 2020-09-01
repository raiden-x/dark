import * as ws from 'ws';
import { Server } from 'http';

import addMessaging from './messaging';
import verifyConnection from './auth';

export default function initializeWebsocket(server: Server): void {
  const wss = new ws.Server({ noServer: true });

  server.on('upgrade', function (request, socket, head): void {
    verifyConnection(request)
      .then((userId) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
          wss.emit('connection', ws, request);
        });
      })
      .catch(() => {
        socket.destroy();
      });
  });

  wss.on('connection', (ws: ws, req: Request) => {
    console.log(req);
    addMessaging(wss, ws);
  });
}
