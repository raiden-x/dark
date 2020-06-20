import { createContext } from "react";

const Message = createContext(null);
const MessageProvider = Message.Provider;
const MessageConsumer = Message.Consumer;

export { Message, MessageConsumer, MessageProvider };
