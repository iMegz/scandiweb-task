import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../HOC/withRouter";
import { getProduct } from "../GraphQL/queries";
import { cartActions } from "../store/cartSlice";
import style from "./Product.module.css";
import Gallery from "./Gallery";
import ProductAttribute from "./ProductAttribute";
import { ButtonFill, ButtonMinus, ButtonPlus } from "../UI/Buttons";

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
            const inCart = this.props.cart.find((p) => p.id === productId);
            const attributes = inCart
                ? inCart.attributes
                : data.product.attributes.map(({ id, items }) => {
                      return {
                          id,
                          value: items[0].value,
                      };
                  });
            this.setState({ product: data.product, inCart, attributes });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart) {
            const id = this.state.product.id;
            const inCart = this.props.cart.find((p) => p.id === id);
            this.setState({ inCart });
        }
    }

    changeAttribute(attrId, value) {
        if (this.state.inCart)
            this.props.changeAttribute(this.state.product.id, attrId, value);
        else {
            const attributes = this.state.attributes.map((attr) => {
                if (attr.id == attrId) attr.value = value;
                return attr;
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
            return (
                <div className={style["amount-section"]}>
                    <ButtonPlus
                        onClick={this.props.incrementAmount.bind(
                            this,
                            this.state.product.id
                        )}
                    />
                    {this.state.inCart.amount}
                    <ButtonMinus
                        onClick={this.props.decrementAmount.bind(
                            this,
                            this.state.product.id
                        )}
                    />
                </div>
            );
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
            const { name, brand, gallery, prices, attributes, description } =
                this.state.product;
            const price = prices.find(
                (p) => p.currency.symbol === this.props.currency
            )?.amount;
            const fullPrice = `${this.props.currency} ${price}`;

            const attributeValues = this.state.inCart?.attributes;

            return (
                <>
                    <Gallery gallery={gallery} productName={name} />
                    <div className={style["product-info"]}>
                        <h1>{brand}</h1>
                        <h2>{name}</h2>
                        {attributes.map((attr) => (
                            <ProductAttribute
                                key={attr.id}
                                {...attr}
                                changeAttribute={this.changeAttribute.bind(
                                    this
                                )}
                                value={
                                    this.state.inCart
                                        ? attributeValues.find(
                                              ({ id }) => attr.id === id
                                          ).value
                                        : this.state.attributes.find(
                                              ({ id }) => attr.id === id
                                          ).value
                                }
                            />
                        ))}
                        <span style={{ marginTop: "12px" }}>Price:</span>
                        <div className={style["product-price"]}>
                            {fullPrice}
                        </div>
                        {this.addToCartBtn()}
                        <div
                            className={style.description}
                            dangerouslySetInnerHTML={{ __html: description }}
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
    return {
        currency: state.data.currency.active,
        cart: state.cart,
    };
};

const mapDispatchToProps = {
    changeAttribute(productId, attrId, value) {
        return cartActions.changeAttribute(productId, attrId, value);
    },
    incrementAmount(id) {
        return cartActions.incrementAmount(id);
    },
    decrementAmount(id) {
        return cartActions.decrementAmount(id);
    },
    addToCart(product) {
        return cartActions.addToCart(product);
    },
};
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Product);
