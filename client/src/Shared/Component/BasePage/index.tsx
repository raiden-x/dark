import styled from "styled-components";

import { backgroundColor } from "../../theme";

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  background-color: ${backgroundColor};
`;

export default Page;
