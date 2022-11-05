import React, { Component } from "react";
import style from "./Swatch.module.css";

export class Swatch extends Component {
    render() {
        let { color, size, selected, disabled, onClick } = this.props;

        selected = selected ? style["selected"] : "";
        disabled = disabled ? style["disabled"] : "";
        return (
            <i
                onClick={onClick}
                style={{ backgroundColor: color }}
                className={`${style["swatch"]} ${style[size]} ${selected} ${disabled}`}
            ></i>
        );
    }
}

export default Swatch;
