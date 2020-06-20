import styled from "styled-components";
import {
  errorBackgroundColor,
  onErrorBackgroundHE,
  onErrorBackgroundLE,
} from "../../theme";

const ErrorDiv = styled.div`
  padding: 0.75rem 1.25rem;
  color: ${onErrorBackgroundHE};
  background-color: ${errorBackgroundColor};
  border: 1px solid ${onErrorBackgroundLE};
  border-radius: 5px;
`;

export default ErrorDiv;
