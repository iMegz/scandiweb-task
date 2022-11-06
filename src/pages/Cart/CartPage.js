import React, { Component } from "react";
import { connect } from "react-redux";
import NotFound from "../../shared/components/NotFound/NotFound";
import { compressCart, decompressCart } from "../../shared/utils/cart";
import LoadingPage from "../Loading/LoadingPage";
import style from "./CartPage.module.css";
import CartCard from "./components/CartCard/CartCard";

export class CartPage extends Component {
    constructor() {
        super();
        this.state = {
            cart: null,
        };
    }

    render() {
        const cart = this.props.cart;
        const currency = this.props.currency;
        if (!(cart && currency)) return <LoadingPage />;
        else if (!cart.length)
            return (
                <main>
                    <h1 className={style["h1"]}>Cart</h1>
                    <hr className={style["hr"]} />{" "}
                    <NotFound msg="Your cart is empty" />
                </main>
            );
        else
            return (
                <main>
                    <h1 className={style["h1"]}>Cart</h1>
                    <hr className={style["hr"]} />
                    {cart.map((product, i) => (
                        <React.Fragment key={i}>
                            <CartCard
                                product={product}
                                currency={this.props.currency}
                            />
                            <hr className={style["hr"]} />
                        </React.Fragment>
                    ))}
                </main>
            );
    }
}

const mapStateToProps = ({ cart, currency }) => {
    return { cart, currency: currency.active };
};

export default connect(mapStateToProps)(CartPage);
