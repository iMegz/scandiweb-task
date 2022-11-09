import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../shared/components/Button/Button";
import NotFound from "../../shared/components/NotFound/NotFound";
import { calcPrice } from "../../shared/utils";
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
        const total = currency
            ? cart
                  .reduce(
                      (prev, curr) =>
                          prev + calcPrice(curr.prices, currency) * curr.amount,
                      0
                  )
                  .toFixed(2)
            : 0;
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
                    <table className={style["summary-table"]}>
                        <tbody>
                            <tr>
                                <td>Tax 21%:</td>
                                <td>{`${currency}${(total * 0.21).toFixed(
                                    2
                                )}`}</td>
                            </tr>
                            <tr>
                                <td>Quantity:</td>
                                <td>{this.props.size}</td>
                            </tr>
                            <tr>
                                <td>Total:</td>
                                <td>{`${currency}${total}`}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button type="fill" size="lg">
                        Order
                    </Button>
                </main>
            );
    }
}

const mapStateToProps = ({ cart, currency }) => {
    return {
        cart,
        currency: currency.active,
        size: cart.reduce((prev, curr) => prev + curr.amount, 0),
    };
};

export default connect(mapStateToProps)(CartPage);
