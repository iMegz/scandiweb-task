import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { ButtonRounded } from "../UI/Buttons";
import { CartIcon } from "../UI/Icons";
import style from "./ProductCard.module.css";

export class ProductCard extends Component {
    constructor() {
        super();
        this.state = {
            showProduct: false,
        };
    }
    showProduct() {
        this.setState({ showProduct: true });
    }
    showCartModal(e) {
        e.stopPropagation();
    }
    render() {
        const { id, brand, name, gallery, inStock, prices, currency } =
            this.props;
        const fullName = `${brand} ${name}`;

        const price = prices.find(
            (price) => price.currency.symbol === currency
        )?.amount;
        const fullPrice = `${currency} ${price}`;

        const className = `${style["product-card"]} ${
            !inStock && style["out-of-stock"]
        }`;
        return (
            <div className={className} onClick={this.showProduct.bind(this)}>
                {this.state.showProduct && <Navigate to={id} />}
                <div className={style["add-to-cart-btn"]}>
                    <ButtonRounded onClick={this.showCartModal.bind(this)}>
                        <CartIcon color="#ffffff" />
                    </ButtonRounded>
                </div>
                <img src={gallery[0]} alt={fullName} />
                <h2>{fullName}</h2>
                <span>{fullPrice}</span>
            </div>
        );
    }
}

export class ProductCardTemp extends Component {
    render() {
        return (
            <div className={style["temp-product"]}>
                <div className={style["temp-img"]}></div>
                <div className="temp-info">
                    <span className={style["temp-title"]}></span>
                    <span className={style["temp-price"]}></span>
                </div>
            </div>
        );
    }
}

export default ProductCard;
