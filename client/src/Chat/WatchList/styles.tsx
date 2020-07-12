import styled from "styled-components";

import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";

import ScrollDiv from "../../Shared/Component/ScrollableDiv";
import {
  backgroundColorElevation,
  backgroundColorLowElevation,
} from "../../Shared/theme";

export const StyledList = styled(List)``;

export const StyledListContainer = styled(ScrollDiv)`
  flex: 1 0 auto;
  max-height: calc(100% - 48px);
`;

export const StyledWatchList = styled.div`
  border-left: 1px solid ${backgroundColorElevation};
  max-height: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`;

export const Search = styled(TextField)`
  flex: 0 0 auto;
`;

export const StyledWatchListHeader = styled.div`
  display: flex;
  height: 48px;
  justify-content: space-between;
  padding-left: 10px;
  background-color: ${backgroundColorLowElevation};
`;
