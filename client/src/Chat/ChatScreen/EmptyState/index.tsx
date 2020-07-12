import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import Chat from "@material-ui/icons/Chat";

import { StyledEmptyDiv } from "./styles";

export default function EmptyState({ openDialog }: EmptyStateProps) {
  return (
    <StyledEmptyDiv>
      <IconButton onClick={openDialog} color="primary">
        <Chat style={{ height: "2em", width: "2em" }} />
      </IconButton>
    </StyledEmptyDiv>
  );
}

interface EmptyStateProps {
  openDialog: () => void;
}
