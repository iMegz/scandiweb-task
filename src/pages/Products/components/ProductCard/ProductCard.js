import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../../../../config/redux/cart";
import Button from "../../../../shared/components/Button/Button";
import { calcPrice, deepCopy } from "../../../../shared/utils";
import CartIcon from "../../../../shared/components/CartIcon/CartIcon";
import style from "./ProductCard.module.css";

export class ProductCard extends Component {
    addToCart(e) {
        e.stopPropagation();
        const product = deepCopy(this.props.product);
        product.attributes.forEach((attr) => (attr.selected = 0));
        this.props.addToCart(product);
    }

    render() {
        const { brand, name, inStock, prices, gallery } = this.props.product;

        const title = `${brand} ${name}`;
        const outOfStock = inStock ? "" : style["out-of-stock"];
        const price = calcPrice(prices, this.props.currency);

        return (
            <div
                onClick={this.props.showProduct}
                className={`${style["product-card"]} ${outOfStock}`}
            >
                <img
                    src={gallery[0]}
                    alt={title}
                    className={style["product-image"]}
                />
                <h2 className={style["product-title"]}>{title}</h2>
                <h3
                    className={style["product-price"]}
                >{`${this.props.currency} ${price}`}</h3>
                <Button
                    onClick={this.addToCart.bind(this)}
                    type="round"
                    className={style["add-to-cart-btn"]}
                >
                    <CartIcon className={style["cart-icon"]} />
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currency: state.currency.active,
    };
};

const mapDispatchToProps = {
    addToCart(product) {
        return cartActions.add(product);
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
