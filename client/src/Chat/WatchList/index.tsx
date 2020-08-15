import * as React from "react";
import { useState, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/PersonAdd";

import { Tab } from "../../Shared/Hooks/useChatState";
import useWatchListState, {
  WatchList,
} from "../../Shared/Hooks/useWatchListState";
import withNavDrawer from "../../Shared/Component/NavDrawer";

import Item from "./WatchListItem";
import EmptyState from "./EmptyState";
import AddUser from "./AddUser";
import {
  StyledList,
  StyledWatchListHeader,
  StyledListContainer,
} from "./styles";

function WatchList({ openChatWindow, connectionState }: WatchListProps) {
  const {
    list,
    addUserToWatchList,
    removeUserFromWatchList,
  } = useWatchListState(connectionState);

  const [dialogState, changeDialogState] = useState<boolean>(false);

  const handleClose = useCallback(
    (userId: string) => {
      changeDialogState(false);
      addUserToWatchList(userId);
    },
    [addUserToWatchList]
  );

  const renderList = useCallback(
    (users: WatchList[]) => {
      return users.map((user, index) => (
        <Item
          key={index}
          user={user}
          removeFn={removeUserFromWatchList}
          openChatWindow={openChatWindow}
        />
      ));
    },
    [openChatWindow, removeUserFromWatchList]
  );

  return (
    <>
      <StyledWatchListHeader>
        <h3> Watch List</h3>
        <IconButton onClick={changeDialogState.bind(this, true)}>
          <Add></Add>
        </IconButton>
      </StyledWatchListHeader>
      {!!list.length && (
        <StyledListContainer>
          <StyledList>{renderList(list)}</StyledList>
        </StyledListContainer>
      )}
      {!list.length && (
        <EmptyState openDialog={changeDialogState.bind(this, true)} />
      )}
      <AddUser open={dialogState} handleClose={handleClose} />
    </>
  );
}

interface WatchListProps {
  className?: string;
  openChatWindow: (tab: Tab) => void;
  connectionState: boolean;
}

export default withNavDrawer<WatchListProps>(WatchList);
