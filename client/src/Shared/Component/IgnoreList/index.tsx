import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import List from "@material-ui/core/List";
import InputAdornment from "@material-ui/core/InputAdornment";
import Add from "@material-ui/icons/Add";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import IgnoreListItem from "./IgnoreListItem";
import {
  StyledFormControl,
  StyledInput,
  StyledIconButton,
  StyledDialog,
  StyledDialogContentText,
  StyledDialogTitle,
  StyledTitle,
  StyledDialogContent,
} from "./styles";

import { ignoreList, user } from "../../APIs";
import { useShowSnackbar } from "../../Hooks/useSnackbar";

export default function IgnoreList({ open, handleClose }: IgnoreListProps) {
  const [list, changeList] = useState([]);
  const showMessage = useShowSnackbar();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    async function load() {
      const data = await ignoreList.load();
      changeList(data);
    }
    load();
  }, []);

  const addToIgnoreList = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const input = inputRef.current.value;
      const isValidUser = !!input && (await user.check(input));
      if (isValidUser) {
        changeList((list) => {
          if (list.findIndex((user) => user === input) === -1 && input) {
            return [...list, input];
          }
          return list;
        });
        ignoreList.add(input);
      } else {
        showMessage("User does not exist");
      }
      inputRef.current.value = "";
    },
    [changeList, showMessage]
  );

  const removeFromIgnoreList = useCallback(
    async (userId) => {
      changeList((list) => list.filter((id) => id !== userId));
      ignoreList.delete(userId);
    },
    [changeList]
  );

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth={"sm"}>
      <StyledDialogTitle disableTypography={true}>
        <StyledTitle>Ignore List</StyledTitle>
        <StyledIconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </StyledIconButton>
      </StyledDialogTitle>
      <form onSubmit={addToIgnoreList}>
        <StyledFormControl variant="outlined">
          <StyledInput
            id="message-input"
            rows={1}
            placeholder="Add to Ignore list..."
            inputRef={inputRef}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={addToIgnoreList}>
                  <Add style={{ width: "0.5em", height: "0.5em" }}></Add>
                </IconButton>
              </InputAdornment>
            }
          />
        </StyledFormControl>
      </form>
      <StyledDialogContentText>
        This contains the list of users that you have ignored. You will not be
        able to recieve messages from ignored users.
      </StyledDialogContentText>
      <StyledDialogContent style={{ padding: "0px 24px" }}>
        <List style={{ padding: "0px" }}>
          {list.map((userId, index) => (
            <IgnoreListItem
              userId={userId}
              key={index}
              removeFn={removeFromIgnoreList.bind(this, userId)}
            />
          ))}
        </List>
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <b>Close</b>
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

interface IgnoreListProps {
  open: boolean;
  handleClose: () => void;
}
