import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../HOC/withRouter";
import Product from "../products/Product";
import { cartActions } from "../store/cartSlice";
import { getProduct } from "../GraphQL/queries";

export class ProductPage extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            inCart: [],
        };
    }

    componentDidMount() {
        const productId = this.props.params.productId;
        getProduct(productId).then(({ data }) => {
            const inCart = this.cartData(data.product);
            this.setState({ product: data.product, inCart });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({ inCart: this.cartData() });
        }
    }

    cartData() {
        const id = this.props.params.productId;
        return this.props.cart.filter((p) => p.id === id);
    }

    render() {
        return (
            <div>
                {this.state.inCart.map((inCart) => (
                    <Product
                        key={inCart.cartId}
                        product={this.state.product}
                        inCart={inCart}
                    />
                ))}
                {this.state.product && !this.state.inCart.length && (
                    <Product product={this.state.product} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { cart: state.cart };
};

const mapDispatchToProps = {
    changeAttribute(payload) {
        return cartActions.changeAttribute(payload);
    },
    addToCart(product) {
        return cartActions.addToCart(product);
    },
};
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ProductPage);
