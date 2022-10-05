import React, { Component } from "react";
import style from "./Buttons.module.css";
import { MinusIcon, PlusIcon } from "./Icons";

//Button logic
class Button extends Component {
    constructor(props) {
        super(props);
        this.className = null;
        this.children = props?.children;
    }
    updateClassName() {
        return this.className;
    }
    render() {
        const onClick = this.props.onClick;
        const className = this.updateClassName();
        return (
            <button className={className} onClick={onClick}>
                {this.props?.children || this.children}
            </button>
        );
    }
}

//Filled button
export class ButtonFill extends Button {
    updateClassName() {
        const btnSize = this.props.size || "large";
        return `${style["btn-fill"]} ${style[`btn-${btnSize}`]}`;
    }
}

//Outlined button
export class ButtonOutline extends Button {
    updateClassName() {
        const btnSize = this.props.size || "large";
        const isActive = this.props.active ? style.active : "";
        return `${style["btn-outline"]} ${style[`btn-${btnSize}`]} ${isActive}`;
    }
}

//Transparent button
export class ButtonTransparent extends Button {
    updateClassName() {
        return style["btn-transparent"];
    }
}

//Rounded filled button
export class ButtonRounded extends Button {
    updateClassName() {
        return style["btn-rounded"];
    }
}

//Button with [ + ] sign
export class ButtonPlus extends Button {
    constructor(props) {
        super(props);
        const btnSize = props.size || "medium";
        this.className = `${style["btn-outline"]} ${style[`btn-${btnSize}`]}`;
        this.children = <PlusIcon size={btnSize} />;
    }
}

//Button with [ - ] sign
export class ButtonMinus extends Button {
    constructor(props) {
        super(props);
        const btnSize = props.size || "medium";
        this.className = `${style["btn-outline"]} ${style[`btn-${btnSize}`]}`;
        this.children = <MinusIcon size={btnSize} />;
    }
}

//Swatch picker
export class ButtonColor extends Component {
    setBackground(color) {
        return {
            background: `linear-gradient(to bottom, ${color} 0%, ${color} 100%) content-box,
        linear-gradient(to bottom, #ffffff 0%, #ffffff 100%) padding-box`,
        };
    }

    render() {
        const { onClick, color, active, size } = this.props;
        const isActive = active ? style.active : "";
        return (
            <button
                style={this.setBackground(color)}
                className={`${style[`btn-color-${size}`]} ${isActive}`}
                onClick={onClick}
            ></button>
        );
    }
}
