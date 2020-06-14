import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body, input {
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
    }
    body, #app {
        height: 100vh;
        width: 100vw;
        margin: 0px;
        background-color: #333;
        color: whitesmoke;
    }
`;

export default GlobalStyles;
