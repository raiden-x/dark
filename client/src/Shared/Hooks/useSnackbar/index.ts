import { useContext, useState, useCallback } from "react";
import { SnackbarProps } from "@material-ui/core/Snackbar";
import { Message } from "../../Context/Message";

export function useShowSnackbar() {
  const setSnackbarState = useContext(Message);
  const showSnackbar = (message: string) => {
    setSnackbarState((state: any) => ({ ...state, message, open: true }));
  };
  return showSnackbar;
}

export function useInitSnackbar() {
  const handleClose = useCallback(() => {
    setSnackbarState((state: SnackbarProps) => ({ ...state, open: false }));
  }, []);
  const initState: SnackbarProps = {
    open: false,
    onClose: handleClose,
    autoHideDuration: 4000,
  };
  const [snackbarState, setSnackbarState]: [
    SnackbarProps,
    React.Dispatch<React.SetStateAction<SnackbarProps>>
  ] = useState(initState);
  return [snackbarState, setSnackbarState];
}
