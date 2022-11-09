import React, { Component } from "react";
import { createPortal } from "react-dom";
import style from "./Overlay.module.css";

export class Overlay extends Component {
    render() {
        return createPortal(
            <div className={style["overlay"]}></div>,
            document.querySelector("#overlay")
        );
    }
}

export default Overlay;
