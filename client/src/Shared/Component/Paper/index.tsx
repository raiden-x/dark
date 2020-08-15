import styled from "styled-components";
import { backgroundColorElevation } from "../../theme";

const StyledPaper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 10px 20px 20px 20px;
  background-color: ${backgroundColorElevation};
  box-shadow: 0 8px 6px -6px black;
  border-radius: 5px;
`;

export default StyledPaper;
