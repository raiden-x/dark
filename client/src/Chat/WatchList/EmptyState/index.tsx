import * as React from "react";

import Button from "@material-ui/core/Button";

import { EmptyDiv, EmptyMessage } from "./styles";

export default function EmptyChatList({ openDialog }: EmptyStateProps) {
  return (
    <EmptyDiv>
      <EmptyMessage>
        {"It's Empty"}
        <br />
        Click on add button to know when a user comes online
        <br />
        <br />
        <Button onClick={openDialog} color="primary">
          <b>Add User</b>
        </Button>
      </EmptyMessage>
    </EmptyDiv>
  );
}

interface EmptyStateProps {
  openDialog: () => void;
}
