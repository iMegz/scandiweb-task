import React, { Component } from "react";
import "../../../../assets/css/ProductInfo.css";
import { getProduct } from "../../../../config/graphql/queries";
import withRouter from "../../../../shared/components/HOC/withRouter";
import NotFound from "../../../../shared/components/NotFound/NotFound";
import Gallery from "../Gallery/Gallery";
import style from "./Product.module.css";
import ProductAttributes from "../ProductAttributes/ProductAttributes";
import { compose } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { calcPrice } from "../../../../shared/utils/index";
import Button from "../../../../shared/components/Button/Button";
import parse from "html-react-parser";
import { sanitize } from "dompurify";
import { cartActions } from "../../../../config/redux/cart";

export class Product extends Component {
    constructor() {
        super();
        this.state = {
            product: null,
        };
    }

    componentDidMount() {
        const id = this.props.params.product;
        getProduct(id).then(({ data }) => {
            //Deep copy the result to be able to modify it
            const product = JSON.parse(JSON.stringify(data.product));
            if (product) {
                product.attributes.forEach((attr) => (attr.selected = 0));
            }
            this.setState({ product: product || undefined });
        });
    }
    addToCart() {
        const attributes = this.state.product.attributes.map(
            ({ id, selected }) => {
                return { id, selected };
            }
        );
        const product = {
            id: this.state.product.id,
            attributes,
        };
        console.log(product);
        this.props.addToCart(product);
    }
    changeAttribute(id, value) {
        const product = this.state.product;
        const attributes = product.attributes.map((attr) => {
            if (attr.id === id) attr.selected = value;
            return attr;
        });
        this.setState({ product: { ...product, attributes } });
    }

    render() {
        const product = this.state.product;
        if (product === null) {
            //Still fetching
            return <main>Fetching</main>;
        } else if (product === undefined) {
            //Product not found
            const msg = "We have searched 404 times but found no products here";
            return (
                <main>
                    <NotFound msg={msg} />
                </main>
            );
        } else {
            //Product found
            const {
                gallery,
                brand,
                name,
                attributes,
                prices,
                inStock,
                description,
            } = this.state.product;
            const currency = this.props.currency;
            const price = calcPrice(prices, currency);

            return (
                <main className={style["product"]}>
                    <Gallery gallery={gallery} title={`${brand} ${name}`} />
                    <div className={style["product-info-section"]}>
                        <h1 className="product-brand">{brand}</h1>
                        <h2 className="product-name">{name}</h2>
                        <div className={style["attributes-list"]}>
                            <ProductAttributes
                                attributes={attributes}
                                change={this.changeAttribute.bind(this)}
                            />
                        </div>
                        <span className="product-attribute-name">price :</span>
                        <span className="product-price">{`${currency} ${price}`}</span>
                        {inStock ? (
                            <Button
                                type="fill"
                                size="lg"
                                onClick={this.addToCart.bind(this)}
                                className={style["add-to-cart-btn"]}
                            >
                                Add to cart
                            </Button>
                        ) : (
                            <span className={style["out-of-stock"]}>
                                OUT OF STOCK
                            </span>
                        )}
                        {parse(sanitize(description))}
                    </div>
                </main>
            );
        }
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
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Product);
