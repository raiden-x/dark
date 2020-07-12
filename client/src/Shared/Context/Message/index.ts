import { createContext, Dispatch, SetStateAction, Context } from "react";
import { SnackbarProps } from "@material-ui/core/Snackbar";

const Message: Context<Dispatch<SetStateAction<SnackbarProps>>> = createContext(
  null
);
const MessageProvider = Message.Provider;
const MessageConsumer = Message.Consumer;

export { Message, MessageConsumer, MessageProvider };
