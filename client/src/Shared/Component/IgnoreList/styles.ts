import styledComponent from "styled-components";

import { styled } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";

import {
  backgroundColorElevation,
  primaryColor,
  secondaryColor,
} from "../../theme";

export const StyledFormControl = styled(FormControl)({
  boxSizing: "border-box",
  width: "100%",
  padding: "8px 24px",
});

export const StyledInput = styled(Input)({
  height: "40px",
});

export const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: backgroundColorElevation,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  boxSizing: "border-box",
});

export const StyledTitle = styledComponent.h3`
  color: ${primaryColor};
`;

export const StyledDialogContent = styledComponent(DialogContent)`
  overflow-y: auto;
  scrollbar-color: hsla(0, 0%, 100%, 0.16) transparent;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${secondaryColor};
  }
  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.1);
  }
`;

export const StyledDialog = styled(Dialog)({});

export const StyledDialogContentText = styled(DialogContentText)({
  padding: "8px 24px",
});

export const StyledIconButton = styled(IconButton)({
  height: "48px",
  width: "48px",
});
