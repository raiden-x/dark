import * as React from "react";
import { useRef } from "react";

import { Message } from "../../../Shared/Hooks/useChatState";
import useMaintainScrollPosition from "../../../Shared/Hooks/useMaintainScrollPosition";

import UserMessage from "./Message";
import MessageInput from "./MessageInput";
import { StyledChatTab, MessageContainer } from "./styles";

export default function ChatTab(props: ChatTabProps) {
  const { value, userId, messages, sendMessage } = props;
  const el = useRef<HTMLDivElement>();
  useMaintainScrollPosition(el, messages);
  return (
    <StyledChatTab
      role="tabpanel"
      hidden={value !== userId}
      style={{ display: value === userId ? "flex" : "none" }}
    >
      <MessageContainer ref={el}>
        {messages.map((message, index) => (
          <UserMessage
            key={index}
            message={message}
            isSame={message.from === messages[index - 1]?.from}
          />
        ))}
      </MessageContainer>
      <MessageInput sendMessage={sendMessage} userId={userId} />
    </StyledChatTab>
  );
}

interface ChatTabProps {
  value: string;
  userId: string;
  messages: Message[];
  sendMessage: (m: Message) => void;
}
