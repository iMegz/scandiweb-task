import React, { Component } from "react";
import { connect } from "react-redux";
import style from "./Badge.module.css";

export class Badge extends Component {
    render() {
        const size = this.props.size;
        const props = {
            ...this.props,
            size: undefined,
            dispatch: undefined,
            className: `${this.props.className || ""} ${style["badge"]}`,
        };
        return size ? <div {...props}>{size}</div> : <></>;
    }
}
const mapStateToProps = ({ cart }) => {
    return {
        size: cart.reduce((prev, curr) => prev + curr.amount, 0),
    };
};
export default connect(mapStateToProps)(Badge);
