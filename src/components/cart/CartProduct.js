import React, { Component } from "react";
import { connect } from "react-redux";
import ProductAmount from "../products/ProductAmount";
import ProductInfo from "../products/ProductInfo";
import { cartActions } from "../store/cartSlice";
import CartGalery from "./CartGallery";

export class CartProduct extends Component {
    changeAttribute(attrId, value) {
        const payload = { productId: this.props.product.id, attrId, value };
        this.props.changeAttribute(payload);
    }

    render() {
        const product = this.props.product;
        const inCart = this.props.cart.find((p) => p.id === product.id);
        const mini = this.props.mini;
        return (
            <>
                <div style={{ display: "flex", overflow: "hidden" }}>
                    <ProductInfo
                        product={product}
                        changeAttribute={this.changeAttribute.bind(this)}
                        stateAttributes={inCart.attributes}
                        priceSection={!mini}
                        size={mini ? "small" : "large"}
                    />
                    <div style={{ flexGrow: 1 }}></div>
                    <ProductAmount
                        size={mini ? "small" : "medium"}
                        id={product.id}
                    />
                    <CartGalery
                        full={!mini}
                        productName={product.name}
                        gallery={product.gallery}
                    />
                </div>
                {!mini && <hr></hr>}
            </>
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
};
export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
