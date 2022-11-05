import React, { Component } from "react";
import style from "./NotFound.module.css";
import notFoundImg from "../../../assets/images/productNotFound.svg";

export class NotFound extends Component {
    render() {
        return (
            <div className={style["not-found"]}>
                <img src={notFoundImg} alt="Product not found" />
                <span>{this.props.msg}</span>
            </div>
        );
    }
}

export default NotFound;
