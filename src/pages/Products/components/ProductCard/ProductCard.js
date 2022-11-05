import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../../shared/components/Button/Button";
import { calcPrice } from "../../../../shared/utils";
import CartIcon from "../../../../shared/components/CartIcon/CartIcon";
import style from "./ProductCard.module.css";

export class ProductCard extends Component {
    showAddToCartModal(e) {
        e.stopPropagation();
        console.log("Modal");
    }

    render() {
        const { brand, name, inStock, prices, gallery } = this.props;

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
                    onClick={this.showAddToCartModal.bind(this)}
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

export default connect(mapStateToProps)(ProductCard);
