import * as React from "react";
import { useState, useCallback, lazy } from "react";

import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";

import { useShowSnackbar } from "../../Shared/Hooks/useSnackbar";
import { user } from "../../Shared/APIs";
import { PageState, Message, Tab } from "../../Shared/Hooks/useChatState";

import ChatTab from "./ChatTab";
import ChatTabHeader from "./ChatTabHeaders";
import EmptyState from "./EmptyState";
import { StyledPaper } from "./styles";

const AddPerson = lazy(() => import("./AddPerson"));

interface ChatWindowProps {
  className?: string;
  state: PageState;
  openChatWindow: (u: Tab) => void;
  closeChatWindow: (u: Tab) => void;
  sendMessage: (m: Message) => void;
  changeActiveTab: (t: string) => void;
}

export default function ChatWindow({
  className,
  state,
  openChatWindow,
  closeChatWindow,
  sendMessage,
  changeActiveTab,
}: ChatWindowProps) {
  const showSnackBar = useShowSnackbar();
  const [open, setOpen] = useState(false);

  const handleTabChange = (event: React.ChangeEvent, userId: string) => {
    changeActiveTab(userId);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = useCallback(
    async (userId: string) => {
      setOpen(false);
      if (typeof userId === "string" && userId) {
        const isValidUser = await user.check(userId);
        if (isValidUser) {
          openChatWindow({
            userId,
            unreadMessages: 0,
          });
          changeActiveTab(userId);
        } else {
          showSnackBar("User does not exist");
        }
      }
    },
    [showSnackBar, changeActiveTab, openChatWindow]
  );

  const closeTab = useCallback(
    (tab: Tab, e: React.SyntheticEvent) => {
      e.stopPropagation();
      closeChatWindow(tab);
    },
    [closeChatWindow]
  );

  return (
    <>
      {state.tabs.length !== 0 && (
        <div className={className}>
          <StyledPaper>
            <Tabs
              value={state.activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="off"
            >
              {state.tabs.map((tab, index) => (
                <ChatTabHeader
                  key={index}
                  tab={tab}
                  closeTab={closeTab}
                  value={tab.userId}
                />
              ))}
            </Tabs>
            <IconButton onClick={openDialog}>
              <Add></Add>
            </IconButton>
          </StyledPaper>
          {state.tabs.map((tab, index) => {
            const messages = state.messages[tab.userId] || [];
            return (
              <ChatTab
                value={state.activeTab}
                key={index}
                userId={tab.userId}
                messages={messages}
                sendMessage={sendMessage}
              ></ChatTab>
            );
          })}
        </div>
      )}
      {state.tabs.length === 0 && (
        <EmptyState openDialog={openDialog}></EmptyState>
      )}
      {open && <AddPerson open={open} handleClose={handleClose}></AddPerson>}
    </>
  );
}
