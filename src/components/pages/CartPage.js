import React, { Component } from "react";
import { connect } from "react-redux";
import CartProduct from "../cart/CartProduct";
import { getProduct } from "../GraphQL/queries";
import { ButtonFill } from "../UI/Buttons";
import style from "./CartPage.module.css";

export class CartPage extends Component {
    constructor() {
        super();
        this.state = {
            products: null,
        };
    }
    componentDidMount() {
        const cart = this.props.cart;
        const queries = cart.map((product) => getProduct(product.id));
        Promise.all(queries).then((result) => {
            const products = {};
            result.forEach(
                ({ data }) => (products[data.product.id] = data.product)
            );
            this.setState({ products });
        });
    }

    displayProducts() {
        if (this.state.products && this.props.cart.length) {
            return this.props.cart.map(({ id }) => (
                <CartProduct key={id} product={this.state.products[id]} />
            ));
        }
        return <div className={style["empty-cart"]}>Your cart is empty</div>;
    }

    cartSummary() {
        if (this.props.cart.length && this.state.products) {
            const { total, quantity } = this.props.cart.reduce(
                (prev, current) => {
                    const product = this.state.products[current.id];
                    const price = product.prices.find(
                        (p) => p.currency.symbol === this.props.currency
                    )?.amount;
                    const total = prev.total + price * current.amount;
                    const quantity = prev.quantity + current.amount;

                    return { total, quantity };
                },
                { total: 0, quantity: 0 }
            );
            const tax = (total * 0.21).toFixed(2);
            return (
                <table className={style.summary}>
                    <tr>
                        <td>Tax 21%: </td>
                        <td className={style["summary-value"]}>
                            {`${this.props.currency} ${tax}`}
                        </td>
                    </tr>
                    <tr>
                        <td>Quantity: </td>
                        <td className={style["summary-value"]}>{quantity}</td>
                    </tr>
                    <tr>
                        <td>Total: </td>
                        <td className={style["summary-value"]}>
                            {`${this.props.currency} ${total.toFixed(2)}`}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <ButtonFill>order</ButtonFill>
                        </td>
                    </tr>
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
                {this.cartSummary()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { cart: state.cart, currency: state.data.currency.active };
};
export default connect(mapStateToProps)(CartPage);
