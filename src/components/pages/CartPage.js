import React, { Component } from "react";
import { connect } from "react-redux";
import CartLogic from "../cart/CartLogic";
import CartProduct from "../cart/CartProduct";
import { getProduct } from "../GraphQL/queries";
import { ButtonFill } from "../UI/Buttons";
import style from "./CartPage.module.css";

export class CartPage extends CartLogic {
    displayCartSummary() {
        if (this.props.cart.length && this.state.products) {
            const { total, tax, quantity } = this.cartSummary();
            return (
                <table className={style.summary}>
                    <tbody>
                        <tr>
                            <td>Tax 21%: </td>
                            <td className={style["summary-value"]}>
                                {`${this.props.currency} ${tax}`}
                            </td>
                        </tr>
                        <tr>
                            <td>Quantity: </td>
                            <td className={style["summary-value"]}>
                                {quantity}
                            </td>
                        </tr>
                        <tr>
                            <td>Total: </td>
                            <td className={style["summary-value"]}>
                                {`${this.props.currency} ${total}`}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <ButtonFill>order</ButtonFill>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }

    render() {
        return (
            <div className={style.holder}>
                <h1>Cart</h1>
                <hr />
                <div className={style["cart-products"]}>
                    {this.displayProducts()}
                </div>
                {this.displayCartSummary()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { cart: state.cart, currency: state.data.currency.active };
};
export default connect(mapStateToProps)(CartPage);
