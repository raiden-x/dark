import { authHeaders } from "../Auth";
import { Message } from "../../Hooks/useChatState";
import { WatchList } from "../../Hooks/useWatchListState";
import { WebsocketPayload, isMessageBody, isWatchListBody } from "./types";

let client: WebSocket;

export function startChatConnection(
  changeConnectionState: (s: boolean) => void
) {
  client = new WebSocket(
    `ws://${window.location.host}?x-xsrf-token=${encodeURIComponent(
      authHeaders.XSRF
    )}`
  );
  client.onopen = () => {
    changeConnectionState(true);
    console.log("opened");
  };
}
export function listenToMessage(cb: (message: Message) => void) {
  client.addEventListener("message", ({ data }) => {
    const payload: WebsocketPayload = JSON.parse(data);
    if (!isMessageBody(payload.body, payload.topic)) {
      return;
    }
    cb(payload.body);
  });
}

export function listenToStatusChange(cb: (status: WatchList) => void): void {
  client.addEventListener("message", ({ data }) => {
    const payload: WebsocketPayload = JSON.parse(data);
    if (!isWatchListBody(payload.body, payload.topic)) {
      return;
    }
    cb(payload.body);
  });
}

export function closeChatConnection(
  changeConnectionState: (s: boolean) => void
) {
  client.close();
  changeConnectionState(false);
}

export function sendMessage(message: Message) {
  client.send(
    JSON.stringify({
      destination: "/app/chat",
      body: JSON.stringify(message),
    })
  );
}

export { client };
