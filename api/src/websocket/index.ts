import * as ws from 'ws';
import { Server } from 'http';

import addMessaging from './messaging';

export default function initializeWebsocket(server: Server): void {
  const wss = new ws.Server({ noServer: true });

  server.on('upgrade', function upgrade(request, socket, head) {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  wss.on('connection', (ws: ws, req: Request) => {
    console.log(req);
    addMessaging(wss, ws);
  });
}
