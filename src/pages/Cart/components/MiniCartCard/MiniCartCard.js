import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../../config/redux/cart";
import Button from "../../../../shared/components/Button/Button";
import { calcPrice } from "../../../../shared/utils";
import ProductAttributes from "../../../Products/components/ProductAttributes/ProductAttributes";
import MiniGallery from "../MiniGallery/MiniGallery";
import style from "./MiniCartCard.module.css";

export class MiniCartCard extends Component {
    increment() {
        this.props.increment(this.props.product);
    }

    decrement() {
        this.props.decrement(this.props.product);
    }

    render() {
        const { brand, name, prices, attributes, amount, gallery } =
            this.props.product;
        const currency = this.props.currency;
        const price = calcPrice(prices, currency);
        return (
            <div className={style["mini-cart-card"]}>
                <div className={style["cart-card-info"]}>
                    <h2 className={style["title"]}>{brand}</h2>
                    <h3 className={style["title"]}>{name}</h3>
                    <span
                        className={style["cart-prdouct-price"]}
                    >{`${currency} ${price}`}</span>
                    <ProductAttributes
                        size="sm"
                        attributes={attributes}
                        disabled
                    />
                </div>
                <div className={style["cart-card-inc-dec"]}>
                    <Button
                        type="outline"
                        size="sm"
                        className={style["btn-amount"]}
                        onClick={this.increment.bind(this)}
                    >
                        +
                    </Button>
                    {amount}
                    <Button
                        type="outline"
                        size="sm"
                        className={style["btn-amount"]}
                        onClick={this.decrement.bind(this)}
                    >
                        -
                    </Button>
                </div>
                <MiniGallery
                    miniCart
                    gallery={gallery}
                    title={`${brand} ${name}`}
                    disabled
                />
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

export default connect(null, mapDispatchToProps)(MiniCartCard);
