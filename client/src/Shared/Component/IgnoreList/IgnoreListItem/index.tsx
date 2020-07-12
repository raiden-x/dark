import * as React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Remove from "@material-ui/icons/Cancel";

import { StyledListItemText, StyledListItem } from "./styles";

export default function IgnoreListItem({
  userId,
  removeFn,
}: IgnoreListItemProps) {
  return (
    <StyledListItem button>
      <StyledListItemText>{userId}</StyledListItemText>
      <ListItemIcon onClick={removeFn.bind(null, userId)}>
        <Remove />
      </ListItemIcon>
    </StyledListItem>
  );
}

interface IgnoreListItemProps {
  userId: string;
  removeFn: (u: string) => void;
}
