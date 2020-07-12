import { createGlobalStyle } from "styled-components";
import { backgroundColor } from "./theme";

const imageJPG = require("../Static/appbackground.jpg");
const imageWbebP = require("../Static/appbackground.webp");

const GlobalStyles = createGlobalStyle`
    body, input {
        font-family: 'Roboto Slab', sans-serif;
        font-size: 14px;
    }
    body {
        height: 100vh;
        width: 100vw;
        display:flex;
        align-items: center;
        justify-content: center;
        margin: 0px;
        @media(min-width: 960px) {
            background-image: url(${imageJPG.default});
            background-image: url(${imageWbebP.default});
            background-repeat: repeat;
            background-size: contain;
        }
    }
    
    #app {
        height: 100vh;
        width: 100vw;
        background-color: ${backgroundColor};
        color: whitesmoke;
        @media(min-width: 960px){
            width: 70vw;
        }
    }
`;

export default GlobalStyles;
