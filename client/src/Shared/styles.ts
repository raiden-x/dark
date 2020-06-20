import { createGlobalStyle } from "styled-components";
import { backgroundColor } from "./theme";

const GlobalStyles = createGlobalStyle`
    body, input {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }
    body, #app {
        height: 100vh;
        width: 100vw;
        margin: 0px;
        background-color: ${backgroundColor};
        color: whitesmoke;
    }
`;

export default GlobalStyles;
