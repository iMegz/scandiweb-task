import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAttribute from "./ProductAttribute";
import style from "./ProductInfo.module.css";

export class ProductInfo extends Component {
    price() {
        const prices = this.props.product.prices;
        const price = prices
            .find((p) => p.currency.symbol === this.props.currency)
            ?.amount.toFixed(2);

        const fullPrice = `${this.props.currency} ${price}`;
        return <div className={style["product-price"]}>{fullPrice}</div>;
    }

    render() {
        const { name, brand, attributes } = this.props.product;
        const { stateAttributes, changeAttribute, priceSection } = this.props;
        const size = this.props.size || "large";
        const sizeClass = size === "small" ? style.small : "";
        return (
            <div className={`${style["product-info"]} ${sizeClass}`}>
                <h1>{brand}</h1>
                <h2>{name}</h2>
                {!priceSection && this.price()}
                <div className={style.attributes}>
                    {attributes.map((attr) => (
                        <ProductAttribute
                            size={size}
                            key={attr.id}
                            {...attr}
                            changeAttribute={changeAttribute}
                            value={
                                stateAttributes.find(({ id }) => attr.id === id)
                                    .value
                            }
                        />
                    ))}
                </div>

                {priceSection && (
                    <span className={style["price-title"]}>Price:</span>
                )}
                {priceSection && this.price()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { currency: state.data.currency.active };
};

export default connect(mapStateToProps)(ProductInfo);
