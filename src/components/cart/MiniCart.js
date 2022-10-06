import React from "react";
import { connect } from "react-redux";
import CartLogic, { mapStateToProps } from "./CartLogic";
import style from "./MiniCart.module.css";

export class MiniCart extends CartLogic {
    render() {
        const summary = this.cartSummary();

        return (
            <div className={style["mini-cart"]}>
                {summary && (
                    <h1>
                        My Bag{" "}
                        <span className={style.quantity}>
                            {summary.quantity} items
                        </span>
                    </h1>
                )}
                <div className={style["cart-products"]}>
                    {this.displayProducts(true)}
                </div>
                {summary && (
                    <div className={style["total"]}>
                        <span>Total</span>
                        <span>
                            {this.props.currency} {summary.total}
                        </span>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(MiniCart);
