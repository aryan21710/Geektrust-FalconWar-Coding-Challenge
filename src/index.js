import React from "react";
import ReactDOM from "react-dom";
import "./styles/base/index.css";
import Approutes from "./routers/Approutes.js";

const output = (
    <Approutes />
);

ReactDOM.render(output, document.getElementById("root"));