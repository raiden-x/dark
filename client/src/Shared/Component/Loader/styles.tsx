import styled from "styled-components";
import PawPrints from "./pawprints";
import { backgroundColor } from "../../theme";

const BaseLoader = styled(PawPrints)`
  @keyframes pulse {
    0% {
      fill: ${backgroundColor};
    }
    50% {
      fill: ${backgroundColor};
    }
    100% {
      fill: white;
    }
  }
  fill: ${backgroundColor};
  transform: rotate(0.25turn);
  animation: pulse 1s infinite;
  animation-direction: alternate;
`;

const Loader3 = styled(BaseLoader)`
  animation-delay: 1s;
`;

const Loader2 = styled(BaseLoader)`
  animation-delay: 0.5s;
`;
const Loader1 = styled(BaseLoader)``;

const Holder = styled.div`
  top: 0px;
  left: 0px;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export { Loader1, Loader2, Loader3, Holder };
