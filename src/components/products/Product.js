//THIS CODE IS NOT OPTIMIZED AND IT IS A REAL MESS FOR NOW
//but it works 🥺👉👈
import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../store/cartSlice";
import style from "./Product.module.css";
import Gallery from "./Gallery";
import { ButtonFill } from "../UI/Buttons";
import ProductInfo from "./ProductInfo";
import ProductAmount from "./ProductAmount";

export class Product extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            attributes: props.product.attributes.map(({ id, items }) => {
                return { id, value: items[0].value };
            }),
        };
    }

    componentDidMount() {
        if (this.props.inCart) {
            this.setState({ attributes: this.props.inCart.attributes });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart && this.props.inCart) {
            const attributes = this.props.cart.find(
                (p) => p.cartId === this.props.inCart.cartId
            ).attributes;
            this.setState({ attributes });
        }
    }

    changeAttribute(attrId, value) {
        if (this.props.inCart) {
            const payload = { cartId: this.props.inCart.cartId, attrId, value };
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
        const id = this.props.product.id;
        const productForCart = {
            id,
            amount: 1,
            attributes: this.state.attributes,
        };
        this.props.addToCart(productForCart);
    }

    addToCartBtn() {
        if (!this.props.product.inStock) {
            return <span className={style["out-of-stock"]}>OUT OF STOCK</span>;
        } else if (this.props.inCart) {
            return <ProductAmount id={this.props.inCart.cartId} dir="row" />;
        } else {
            return (
                <ButtonFill onClick={this.addToCart.bind(this)}>
                    Add to cart
                </ButtonFill>
            );
        }
    }

    displayProduct() {
        if (this.props.product) {
            return (
                <>
                    <Gallery
                        gallery={this.props.product.gallery}
                        productName={this.props.product.name}
                    />
                    <div className={style["product-info-section"]}>
                        <ProductInfo
                            product={this.props.product}
                            changeAttribute={this.changeAttribute.bind(this)}
                            stateAttributes={this.state.attributes}
                            priceSection={true}
                        />
                        {this.addToCartBtn()}
                        <div
                            className={style.description}
                            dangerouslySetInnerHTML={{
                                __html: this.props.product.description,
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);
