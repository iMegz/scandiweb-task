import React, { Component } from "react";
import style from "./Swatch.module.css";

export class Swatch extends Component {
    render() {
        let { color, size, selected, onClick } = this.props;

        selected = selected ? style["selected"] : "";

        return (
            <i
                onClick={onClick}
                style={{ backgroundColor: color }}
                className={`${style["swatch"]} ${style[size]} ${selected}`}
            ></i>
        );
    }
}

export default Swatch;
