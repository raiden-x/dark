import { Message } from "../../Hooks/useChatState";
import { WatchList } from "../../Hooks/useWatchListState";

export enum WebsocketTopic {
  MESSAGE = "MESSAGE",
  STATUS = "STATUS",
}

export interface WebsocketPayload {
  topic: WebsocketTopic;
  body: Message | WatchList;
}

export function isMessageBody(
  obj: Message | WatchList,
  topic: WebsocketTopic
): obj is Message {
  return topic === WebsocketTopic.MESSAGE;
}

export function isWatchListBody(
  obj: Message | WatchList,
  topic: WebsocketTopic
): obj is WatchList {
  return topic === WebsocketTopic.STATUS;
}
