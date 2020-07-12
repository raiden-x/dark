import styled from "styled-components";
import ListItem from "@material-ui/core/ListItem";

import { onBackgroundDisabled, primaryColor } from "../../../Shared/theme";

export const StyledListItemText = styled.div`
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  color: ${(props: any) =>
    props.isOnline ? primaryColor : onBackgroundDisabled};
`;

export const StyledListItem = styled(ListItem)`
  height: 40px;
  .MuiListItemIcon-root {
    display: none;
    text-align: end;
  }
  :hover {
    .MuiListItemIcon-root {
      display: block;
    }
  }
`;
