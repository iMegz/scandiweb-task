import React, { Component } from "react";
import style from "./Button.module.css";

export class Button extends Component {
    render() {
        let { type, size, selected, disabled, children, onClick } = this.props;

        type = type ? style[type] : style["outline"];
        size = size ? style[size] : "";
        selected = selected ? style["selected"] : "";
        disabled = disabled ? style["disabled"] : "";
        const className = `${style.btn} ${type} ${size} ${selected} ${disabled}`;

        return (
            <button onClick={onClick} className={className}>
                {children}
            </button>
        );
    }
}

export default Button;
