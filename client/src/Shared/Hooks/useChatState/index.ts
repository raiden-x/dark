import { useReducer, useCallback } from "react";

import { sendMessage as sendWebsocketMessage } from "../../Utils/Websocket";
import { Tab } from "@material-ui/core";

export interface Message {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface Tab {
  userId: string;
  unreadMessages: number;
}

export interface PageState {
  activeTab: string;
  tabs: Tab[];
  messages: {
    [key: string]: Message[] | void;
  };
  isConnected: boolean;
}

enum Actions {
  OPEN,
  CLOSE,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  CLEAR_UNREAD_MESSAGES,
  CHANGE_TAB,
  CHANGE_CONNECTION_STATE,
}
interface PageAction {
  action: Actions;
  tab?: Tab;
  message?: Message;
  activeTab?: string;
  connectionState?: boolean;
}

const inintalState: PageState = {
  activeTab: null,
  tabs: [],
  messages: {},
  isConnected: false,
};

function changeUnreadMessageCount(
  tabs: Tab[],
  u: string,
  toCount?: number
): Tab[] {
  return tabs.map((tab) => {
    if (tab.userId !== u) {
      return tab;
    }
    tab.unreadMessages =
      toCount === undefined ? tab.unreadMessages + 1 : toCount;
    return tab;
  });
}

function reducer(state: PageState, action: PageAction): PageState {
  switch (action.action) {
    case Actions.OPEN:
      const isTabPresent =
        state.tabs.findIndex(
          (stateTab) => stateTab.userId === action.tab.userId
        ) >= 0;
      if (isTabPresent) {
        return {
          ...state,
          activeTab: action.tab.userId,
        };
      } else {
        return {
          ...state,
          tabs: [...state.tabs, action.tab],
        };
      }
    case Actions.CLOSE:
      const filteredTabs = state.tabs.filter(
        (tab) => action.tab.userId !== tab.userId
      );
      return {
        ...state,
        tabs: filteredTabs,
        activeTab: filteredTabs[filteredTabs.length - 1]?.userId,
      };
    case Actions.MESSAGE_RECIEVED:
      /*
      0. add to messages
      1.check if active tab ? perform none 
      2.if not active tab
          check if tab is already open
            if open just increase message count
            if not open, add tab and add the message count
      3.If no active tab
          make this the active tab

      */
      const fromUser = action.message.from;
      const messageList = state.messages[fromUser] || [];
      const isActiveTab = state.activeTab === fromUser;
      const noTabPreset = !state.activeTab;
      const isTabPreset =
        state.tabs.findIndex((tab) => tab.userId === fromUser) !== -1;
      let newState = {
        ...state,
        messages: {
          ...state.messages,
          [fromUser]: [...messageList, action.message],
        },
      };
      if (isActiveTab) {
        return newState;
      }
      if (isTabPreset) {
        newState = {
          ...newState,
          tabs: changeUnreadMessageCount(newState.tabs, fromUser),
        };
      }
      if (!isTabPreset) {
        newState = {
          ...newState,
          tabs: [...newState.tabs, { userId: fromUser, unreadMessages: 1 }],
        };
      }
      if (noTabPreset) {
        newState = {
          ...newState,
          activeTab: fromUser,
          tabs: changeUnreadMessageCount(newState.tabs, fromUser, 0),
        };
      }
      return newState;
    case Actions.MESSAGE_SENT:
      const sentMessage = state.messages[action.message.to] || [];
      sentMessage.push(action.message);
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.message.to]: sentMessage,
        },
      };
    case Actions.CHANGE_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
        tabs: changeUnreadMessageCount(state.tabs, action.activeTab, 0),
      };
    case Actions.CHANGE_CONNECTION_STATE:
      return { ...state, isConnected: action.connectionState };
    default:
      return state;
  }
}

export default function useChatState() {
  const [state, dispatch] = useReducer(reducer, inintalState);

  const openChatWindow = useCallback(
    (tab: Tab, changeTab?: boolean): void => {
      dispatch({
        action: Actions.OPEN,
        tab,
      });
      if (typeof changeTab === "boolean" && changeTab) {
        dispatch({
          action: Actions.CHANGE_TAB,
          activeTab: tab.userId,
        });
      }
    },
    [dispatch]
  );

  const closeChatWindow = useCallback(
    (tab: Tab) => {
      dispatch({
        action: Actions.CLOSE,
        tab,
      });
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    (message: Message) => {
      dispatch({
        action: Actions.MESSAGE_SENT,
        message: message,
      });
      sendWebsocketMessage(message);
    },
    [dispatch]
  );

  const recieveMessage = useCallback(
    (message: Message) => {
      dispatch({
        action: Actions.MESSAGE_RECIEVED,
        message: message,
      });
    },
    [dispatch]
  );

  const changeActiveTab = useCallback(
    (t: string) => {
      dispatch({
        action: Actions.CHANGE_TAB,
        activeTab: t,
      });
    },
    [dispatch]
  );

  const changeConnectionState = useCallback(
    (s: boolean) => {
      dispatch({
        action: Actions.CHANGE_CONNECTION_STATE,
        connectionState: s,
      });
    },
    [dispatch]
  );

  return {
    state,
    openChatWindow,
    closeChatWindow,
    sendMessage,
    recieveMessage,
    changeActiveTab,
    changeConnectionState,
  };
}
