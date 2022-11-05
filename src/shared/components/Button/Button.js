import React, { Component } from "react";
import style from "./Button.module.css";

export class Button extends Component {
    render() {
        let { type, size, selected, disabled, children, className } =
            this.props;

        type = type ? style[type] : style["outline"];
        size = size ? style[size] : "";
        selected = selected ? style["selected"] : "";
        disabled = disabled ? style["disabled"] : "";

        //Style the btn based on props
        const classes = `${style.btn} ${type} ${size} ${selected} ${disabled} ${
            className || ""
        } `;

        //Pass all normal props to the button so user gain full acces to the button
        const props = {
            ...this.props,
            type: undefined,
            size: undefined,
            selected: undefined,
            disabled: undefined,
        };

        return (
            <button {...props} className={classes}>
                {children}
            </button>
        );
    }
}

export default Button;
