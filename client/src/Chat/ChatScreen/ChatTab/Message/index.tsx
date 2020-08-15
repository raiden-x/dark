import * as React from "react";

import { Message } from "../../../../Shared/Hooks/useChatState";

import {
  RightMessage,
  RightMessageContainer,
  LeftMessage,
  LeftMessageContainer,
  LeftArrow,
  RightArrow,
} from "./styles";

import FormattedMessage from "./Format";

export default function Message({ message, isSame }: MessageProps) {
  const props = { isSame };
  if (message.from) {
    return (
      <LeftMessageContainer {...props}>
        {!isSame && <LeftArrow />}
        <LeftMessage>
          <FormattedMessage message={message.message} />
        </LeftMessage>
      </LeftMessageContainer>
    );
  }
  return (
    <RightMessageContainer {...props}>
      <RightMessage>
        <FormattedMessage message={message.message} />
      </RightMessage>
      {!isSame && <RightArrow />}
    </RightMessageContainer>
  );
}

interface MessageProps {
  message: Message;
  isSame: boolean;
}
