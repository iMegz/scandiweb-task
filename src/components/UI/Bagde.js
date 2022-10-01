import React, { Component } from "react";
import style from "./Badge.module.css";
export class Bagde extends Component {
    render() {
        const value = this.props.value;
        return <div className={style.badge}>{value}</div>;
    }
}

export default Bagde;
