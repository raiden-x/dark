import * as React from "react";
import { useEffect } from "react";

import withNavbar from "../Shared/Component/NavBar";
import useChatState from "../Shared/Hooks/useChatState";
import {
  startChatConnection,
  closeChatConnection,
  listenToMessage,
} from "../Shared/Utils/Websocket";

import { StyledChatScreen, ChatPage } from "./styles";
import WatchList from "./WatchList";

function Chat() {
  const {
    state,
    openChatWindow,
    closeChatWindow,
    sendMessage,
    receiveMessage,
    changeActiveTab,
    changeConnectionState,
  } = useChatState();
  useEffect(() => {
    startChatConnection(changeConnectionState);
    return closeChatConnection.bind(this, changeConnectionState);
  }, [changeConnectionState]);
  useEffect(() => {
    if (state.isConnected) {
      listenToMessage(receiveMessage);
    }
  }, [state.isConnected, receiveMessage]);
  return (
    <ChatPage>
      <StyledChatScreen
        state={state}
        openChatWindow={openChatWindow}
        closeChatWindow={closeChatWindow}
        sendMessage={sendMessage}
        changeActiveTab={changeActiveTab}
      />
      <WatchList
        openChatWindow={openChatWindow}
        connectionState={state.isConnected}
      />
    </ChatPage>
  );
}

export default withNavbar(Chat);
