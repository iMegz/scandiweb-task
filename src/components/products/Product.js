import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../HOC/withRouter";
import { getProduct } from "../GraphQL/queries";
import { cartActions } from "../store/cartSlice";
import style from "./Product.module.css";
import Gallery from "./Gallery";
import { ButtonFill } from "../UI/Buttons";
import ProductInfo from "./ProductInfo";
import ProductAmount from "./ProductAmount";

export class Product extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
            inCart: null,
            attributes: [],
        };
    }

    componentDidMount() {
        const productId = this.props.params.productId;
        getProduct(productId).then(({ data }) => {
            const { inCart, attributes } = this.cartData(data.product);
            this.setState({ product: data.product, inCart, attributes });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            const { inCart, attributes } = this.cartData(this.state.product);
            this.setState({ inCart, attributes });
        }
    }

    cartData(product) {
        const id = this.props.params.productId;
        const inCart = this.props.cart.find((p) => p.id === id);
        const attributes = inCart
            ? inCart.attributes
            : product.attributes.map(({ id, items }) => {
                  return {
                      id,
                      value: items[0].value,
                  };
              });
        return { inCart, attributes };
    }

    changeAttribute(attrId, value) {
        if (this.state.inCart) {
            const payload = { productId: this.state.product.id, attrId, value };
            this.props.changeAttribute(payload);
        } else {
            const attributes = this.state.attributes.map((attr) => {
                const newAttr = attr;
                if (attr.id === attrId) newAttr.value = value;
                return newAttr;
            });
            this.setState({ attributes });
        }
    }

    addToCart() {
        const id = this.state.product.id;
        const productForCart = {
            id,
            amount: 1,
            attributes: this.state.attributes,
        };
        this.props.addToCart(productForCart);
    }

    addToCartBtn() {
        if (!this.state.product.inStock) {
            return <span className={style["out-of-stock"]}>OUT OF STOCK</span>;
        } else if (this.state.inCart) {
            return <ProductAmount id={this.state.product.id} dir="row" />;
        } else {
            return (
                <ButtonFill onClick={this.addToCart.bind(this)}>
                    Add to cart
                </ButtonFill>
            );
        }
    }

    displayProduct() {
        if (this.state.product) {
            return (
                <>
                    <Gallery
                        gallery={this.state.product.gallery}
                        productName={this.state.product.name}
                    />
                    <div className={style["product-info-section"]}>
                        <ProductInfo
                            product={this.state.product}
                            changeAttribute={this.changeAttribute.bind(this)}
                            stateAttributes={this.state.attributes}
                            priceSection={true}
                        />
                        {this.addToCartBtn()}
                        <div
                            className={style.description}
                            dangerouslySetInnerHTML={{
                                __html: this.state.product.description,
                            }}
                        ></div>
                    </div>
                </>
            );
        }
        return null;
    }
    render() {
        return <div className={style.product}>{this.displayProduct()}</div>;
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
)(Product);
