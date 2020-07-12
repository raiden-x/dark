import * as React from "react";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import Remove from "@material-ui/icons/Cancel";

import { StyledListItemText, StyledListItem } from "./styles";

import { Tab } from "../../../Shared/Hooks/useChatState";
import { WatchList, Status } from "../../../Shared/Hooks/useWatchListState";

export default function WatchListItem({
  user,
  removeFn,
  openChatWindow,
}: WatchListProps) {
  const props = { isOnline: user.userStatus === Status.ONLINE };
  return (
    <StyledListItem
      button
      onClick={openChatWindow.bind(
        null,
        { userId: user.username, hasNewItems: false },
        true
      )}
    >
      <StyledListItemText {...props}>{user.username}</StyledListItemText>
      <ListItemIcon onClick={removeFn.bind(null, user.username)}>
        <Remove />
      </ListItemIcon>
    </StyledListItem>
  );
}

interface WatchListProps {
  user: WatchList;
  removeFn: (userId: string, e: React.SyntheticEvent) => void;
  openChatWindow: (userId: Tab) => void;
}
