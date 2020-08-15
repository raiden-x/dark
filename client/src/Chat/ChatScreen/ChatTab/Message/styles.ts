import { styled as styledComponent } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import styled from "styled-components";

import {
  messageCardColor,
  backgroundColorLowElevation,
} from "../../../../Shared/theme";

import Rarrow from "./rightArrow";
import Larrow from "./leftArrow";

const Message = styledComponent(Paper)({
  width: "fit-content",
  maxWidth: "80%",
  padding: "6px 7px 8px 9px",
  boxSizing: "border-box",
  wordBreak: "break-word",
});

export const LeftMessage = styledComponent(Message)({
  borderRadius: "0px 4px 4px 4px",
});

export const RightMessage = styledComponent(Message)({
  background: messageCardColor,
  borderRadius: "4px 0px 4px 4px",
});

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  margin-top: ${(props) => ((props as any).isSame ? "3px" : "12px")};
`;

export const LeftMessageContainer = styled(MessageContainer)`
  justify-content: flex-start;
  padding-left: ${(props) => ((props as any).isSame ? "18px" : "10px")};
`;

export const RightMessageContainer = styled(MessageContainer)`
  justify-content: flex-end;
  padding-right: ${(props) => ((props as any).isSame ? "18px" : "10px")};
`;

export const LeftArrow = styled(Larrow)`
  color: ${backgroundColorLowElevation};
`;

export const RightArrow = styled(Rarrow)`
  color: ${messageCardColor};
`;
