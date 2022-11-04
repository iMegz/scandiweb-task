import React, { Component } from "react";
import style from "./TempProductCard.module.css";

export class TempProductCard extends Component {
    render() {
        return (
            <div className={style["temp-product-card"]}>
                <div className={style["temp-product-image"]}></div>
                <div className={style["temp-product-title"]}></div>
                <div className={style["temp-product-price"]}></div>
            </div>
        );
    }
}

export default TempProductCard;
