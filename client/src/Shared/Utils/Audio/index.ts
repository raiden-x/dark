import { debounce } from "lodash";

const sound = require("../../../Static/Sounds/popup-sound.mp3");

let el: HTMLAudioElement;

export function initAudioStream() {
  el = document.createElement("audio");
  el.src = sound.default;
}

export const playSound = debounce(() => {
  el.play();
}, 1000);
