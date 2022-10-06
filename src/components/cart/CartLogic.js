import React, { Component } from "react";
import CartProduct from "../cart/CartProduct";
import { getProduct } from "../GraphQL/queries";

export class CartLogic extends Component {
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

    displayProducts(mini) {
        if (this.state.products && this.props.cart.length) {
            return this.props.cart.map(({ id }) => (
                <CartProduct
                    mini={mini}
                    key={id}
                    product={this.state.products[id]}
                />
            ));
        }
        const style = {
            opacity: 0.5,
            fontSize: mini ? "14px" : "24px",
            fontWeight: 400,
            lineHeight: mini ? "28px" : "38px",
            textTransform: "uppercase",
        };

        return <div style={style}>Your cart is empty</div>;
    }

    cartSummary() {
        if (this.props.cart && this.state.products) {
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
            return { total: total.toFixed(2), tax, quantity };
        }
    }
}
export const mapStateToProps = (state) => {
    return { cart: state.cart, currency: state.data.currency.active };
};
export default CartLogic;
