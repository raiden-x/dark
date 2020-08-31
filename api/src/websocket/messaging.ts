import ws from 'ws';

export default function addMessaging(wss: ws.Server, ws: ws): void {
  ws.on('message', (message) => {
    console.log(wss.clients);
    console.log(message);
  });
}
