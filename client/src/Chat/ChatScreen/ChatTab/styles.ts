import styled from "styled-components";
import ScrollDiv from "../../../Shared/Component/ScrollableDiv";

export const StyledChatTab = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 1 calc(100% - 48px);
  max-height: calc(100% - 48px);
`;

export const MessageContainer = styled(ScrollDiv)`
  flex: 1 0 calc(100% - 58px);
  flex-flow: column;
  display: flex;
  max-height: calc(100% - 58px);
`;
