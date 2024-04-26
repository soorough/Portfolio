import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import studio from "@theatre/studio";
import r3fExtension from "@theatre/r3f/dist/extension";

studio.extend(r3fExtension);
studio.initialize();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
