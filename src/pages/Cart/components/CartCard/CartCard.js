import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../../config/redux/cart";
import Button from "../../../../shared/components/Button/Button";
import { calcPrice, cartProduct } from "../../../../shared/utils";
import ProductAttributes from "../../../Products/components/ProductAttributes/ProductAttributes";
import MiniGallery from "../MiniGallery/MiniGallery";
import style from "./CartCard.module.css";

export class CartCard extends Component {
    increment() {
        const product = cartProduct(this.props.product);
        this.props.increment(product);
    }

    decrement() {
        const product = cartProduct(this.props.product);
        this.props.decrement(product);
    }

    render() {
        const { brand, name, prices, attributes, amount, gallery } =
            this.props.product;
        const currency = this.props.currency;
        const price = calcPrice(prices, currency);

        return (
            <div className={style["cart-card"]}>
                <div className={style["cart-card-info"]}>
                    <h2 className="product-brand">{brand}</h2>
                    <h3 className="product-name">{name}</h3>
                    <span
                        className={style["cart-prdouct-price"]}
                    >{`${currency} ${price}`}</span>
                    <ProductAttributes attributes={attributes} disabled />
                </div>
                <div className={style["cart-card-inc-dec"]}>
                    <Button
                        type="outline"
                        size="md"
                        className={style["btn-amount"]}
                        onClick={this.increment.bind(this)}
                    >
                        +
                    </Button>
                    {amount}
                    <Button
                        type="outline"
                        size="md"
                        className={style["btn-amount"]}
                        onClick={this.decrement.bind(this)}
                    >
                        -
                    </Button>
                </div>
                <MiniGallery gallery={gallery} title={`${brand} ${name}`} />
            </div>
        );
    }
}
const mapDispatchToProps = {
    increment(product) {
        return cartActions.add(product);
    },
    decrement(product) {
        return cartActions.remove(product);
    },
};

export default connect(null, mapDispatchToProps)(CartCard);
