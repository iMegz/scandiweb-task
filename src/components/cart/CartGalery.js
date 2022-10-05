import React, { Component } from "react";
import style from "./CartGalery.module.css";
import Arrow from "../UI/Arrow";

export class CartGalery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: props.gallery[0],
            imgNo: 0,
        };
    }

    nextImg() {
        const imgNo = (this.state.imgNo + 1) % this.props.gallery.length;
        const img = this.props.gallery[imgNo];
        this.setState({ img, imgNo });
    }
    prevImg() {
        const size = this.props.gallery.length;
        const imgNo = (this.state.imgNo + size - 1) % size;
        const img = this.props.gallery[imgNo];
        this.setState({ img, imgNo });
    }

    changeImgBtns() {
        return (
            <div className={style["change-img-btns"]}>
                <button onClick={this.prevImg.bind(this)}>
                    <Arrow dir="left" />
                </button>
                <button onClick={this.nextImg.bind(this)}>
                    <Arrow dir="right" />
                </button>
            </div>
        );
    }
    render() {
        const productName = this.props.productName;
        const full = this.props.full;
        const size = full ? style["cart-gallery-full"] : "";
        const backgroundImage = `url("${this.state.img}")`;
        return (
            <div
                style={{ backgroundImage }}
                className={`${style["cart-gallery"]} ${size}`}
            >
                {/* <img src={this.state.img} alt={productName} /> */}
                {full && this.changeImgBtns()}
            </div>
        );
    }
}

export default CartGalery;
