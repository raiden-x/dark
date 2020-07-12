import { Client } from "@stomp/stompjs";

import { authHeaders } from "../Auth";
import { Message } from "../../Hooks/useChatState";
import { WatchList, Status } from "../../Hooks/useWatchListState";

declare const SockJS: any;

let client: Client = null;
let disconnect: number = null;

export function startChatConnection(
  changeConnectionState: (s: boolean) => void
) {
  client = new Client({
    connectHeaders: {
      "CSRF-TOKEN": authHeaders.XSRF,
    },
    debug: function (str) {
      console.log(str);
    },
    webSocketFactory: () => {
      return new SockJS(`https://${window.location.host}/chat`);
    },
    reconnectDelay: 5000000000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = function (frame) {
    console.log(frame);
    changeConnectionState(true);
    disconnect = setInterval(() => {
      client.publish({
        destination: "/app/ping",
        body: JSON.stringify({
          userStatus: Status.ONLINE,
        }),
      });
    }, 5000);
  };

  client.onStompError = function (frame) {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };
  client.activate();
}

export function listenToMessage(cb: (message: Message) => void) {
  client.subscribe("/user/queue/reply", (message) =>
    cb(JSON.parse(message.body))
  );
}

export function listenToStatusChange(cb: (status: WatchList) => void): void {
  client.subscribe("/user/queue/status", (message) => {
    cb(JSON.parse(message.body));
  });
}

export function closeChatConnection(
  changeConnectionState: (s: boolean) => void
) {
  client.deactivate();
  changeConnectionState(false);
  clearInterval(disconnect);
}

export function sendMessage(message: Message) {
  client.publish({
    destination: "/app/chat",
    body: JSON.stringify(message),
  });
}

export { client };
