import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "../../../../shared/components/Badge/Badge";
import Button from "../../../../shared/components/Button/Button";
import CartIcon from "../../../../shared/components/CartIcon/CartIcon";
import Dropdown from "../../../../shared/components/Dropdown/Dropdown";
import Overlay from "../../../../shared/components/Overlay/Overlay";
import { calcPrice } from "../../../../shared/utils";
import MiniCartCard from "../MiniCartCard/MiniCartCard";

import style from "./MiniCart.module.css";

export class MiniCart extends Component {
    constructor() {
        super();
        this.ref = React.createRef();
        this.state = {
            show: false,
        };
    }

    toggle() {
        this.setState({ show: !this.state.show });
    }

    render() {
        const cart = this.props.cart;
        const size = this.props.size;
        const currency = this.props.currency;
        const items = size === 1 ? "item" : "items";
        const total = currency
            ? cart
                  .reduce(
                      (prev, curr) =>
                          prev + calcPrice(curr.prices, currency) * curr.amount,
                      0
                  )
                  .toFixed(2)
            : 0;
        return (
            <>
                <Button
                    type="transparent"
                    ref={this.ref}
                    onClick={this.toggle.bind(this)}
                >
                    <CartIcon />
                    <Badge className={style["badge"]} />
                </Button>

                {this.state.show && (
                    <Dropdown
                        className={style["mini-cart"]}
                        onClickOutside={this.toggle.bind(this)}
                        btnRef={this.ref}
                    >
                        <Overlay />
                        <span className={style["my-bag"]}>
                            My Bag,
                            <span className={style["items-count"]}>
                                {size ? ` ${size} ${items}` : ` No ${items}`}
                            </span>
                        </span>
                        <div className={style["cart-content"]}>
                            {cart.map((product, i) => (
                                <React.Fragment key={i}>
                                    <MiniCartCard
                                        product={product}
                                        currency={currency}
                                    />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className={style["total"]}>
                            <span>Total</span>
                            <span>{`${currency}${total}`}</span>
                        </div>
                        <div className={style["btns"]}>
                            <Link to="/cart">
                                <Button
                                    type="outline"
                                    size="lg"
                                    onClick={this.toggle.bind(this)}
                                >
                                    View Bag
                                </Button>
                            </Link>
                            <Button
                                type="fill"
                                size="lg"
                                onClick={this.toggle.bind(this)}
                            >
                                Checkout
                            </Button>
                        </div>
                    </Dropdown>
                )}
            </>
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

export default connect(mapStateToProps)(MiniCart);
