import styled from "styled-components";

const backgroundImage = require("../../../Static/loginBackground.jpg");

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
  background-image: url("${backgroundImage.default}");
  background-repeat: repeat;
  background-size: contain;
`;

export default Page;
