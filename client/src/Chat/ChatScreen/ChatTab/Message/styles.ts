import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

export const StyledMessage = styled(Paper)({
  alignSelf: "start",
  width: "fit-content",
  padding: "10px",
  margin: "5px",
});

export const StyledSelfMessage = styled(Paper)({
  alignSelf: "flex-end",
  width: "fit-content",
  padding: "5px",
  margin: "5px",
  background: "#227F9C",
});
