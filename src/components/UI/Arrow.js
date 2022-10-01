import React, { Component } from "react";
import style from "./Arrow.module.css";
export class Arrow extends Component {
    render() {
        const dir = this.props.dir || "down";
        return <i className={`${style.arrow} ${style[dir]}`}></i>;
    }
}

export default Arrow;
