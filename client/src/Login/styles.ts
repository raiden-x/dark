import styled from "styled-components";
import { Link } from "react-router-dom";
import { onBackgroundLE, secondaryColor } from "../Shared/theme";

export const LESpan = styled.span`
  color: ${onBackgroundLE};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${secondaryColor};
`;
