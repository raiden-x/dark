import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

ReactDOM.render(<App />, document.getElementById("app"));
