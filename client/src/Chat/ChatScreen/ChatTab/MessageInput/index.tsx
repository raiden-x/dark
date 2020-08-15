import * as React from "react";
import { useCallback, useRef } from "react";

import Input from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Send from "@material-ui/icons/Send";

import { Message } from "../../../../Shared/Hooks/useChatState";

import { StyledFormControl } from "./style";

export default function MessageInput({
  sendMessage,
  userId,
}: MessageInputProps) {
  const messageInputEl: React.Ref<HTMLInputElement> = useRef();

  const handleClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const userInput = messageInputEl.current.value.trim();
      if (userInput) {
        const message: Message = {
          from: "",
          to: userId,
          timestamp: new Date().toISOString(),
          message: userInput,
        };
        messageInputEl.current.value = "";
        sendMessage(message);
      }
    },
    [sendMessage, userId]
  );

  return (
    <form onSubmit={handleClick}>
      <StyledFormControl variant="outlined">
        <Input
          id="message-input"
          rows={1}
          placeholder="Type Here..."
          inputRef={messageInputEl}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <Send />
              </IconButton>
            </InputAdornment>
          }
        />
      </StyledFormControl>
    </form>
  );
}

interface MessageInputProps {
  sendMessage: (m: Message) => void;
  userId: string;
}
