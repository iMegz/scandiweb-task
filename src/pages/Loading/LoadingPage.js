import React, { Component } from "react";
import style from "./LoadingPage.module.css";

export class LoadingPage extends Component {
    render() {
        return (
            <div className={style["loading-page"]}>
                <div className={style["spiner"]}></div>
            </div>
        );
    }
}

export default LoadingPage;
