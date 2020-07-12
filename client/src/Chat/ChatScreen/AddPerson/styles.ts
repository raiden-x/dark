import { styled, makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";

export const StyledDialog = styled(Dialog)({
  ".MuiDialog-paper": {
    "min-width": "400px",
  },
});

export const useStyles = makeStyles({
  root: {
    ".MuiDialog-paper": {
      "min-width": "400px",
    },
  },
});
