import React, { Component } from "react";
import { connect } from "react-redux";
import { dataActions } from "../store/dataSlice";
import style from "./Navbar.module.css";
import NavLinks from "./NavLinks";
import { ButtonTransparent } from "../UI/Buttons";
import Arrow from "../UI/Arrow";
import logo from "./logo.svg";
import { CartIcon } from "../UI/Icons";
import Bagde from "../UI/Bagde";

import { Link } from "react-router-dom";

export class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            selectingCurrency: false,
        };
    }

    selectCurrency() {}

    showMiniCart() {}

    render() {
        const cartBadge = this.props.cart.length ? (
            <div className={style["cart-badge"]}>
                <Bagde value={this.props.cart.length} />
            </div>
        ) : null;

        return (
            <nav className={style.navbar}>
                <div>
                    <NavLinks
                        {...this.props.category}
                        setActiveCategory={this.props.setActiveCategory}
                    />
                </div>
                <div>
                    <img className={style.logo} src={logo} alt="logo" />
                </div>
                <div>
                    <ButtonTransparent onClick={this.selectCurrency.bind(this)}>
                        {this.props.currency}{" "}
                        {this.state.selectingCurrency ? (
                            <Arrow dir="up" />
                        ) : (
                            <Arrow />
                        )}
                    </ButtonTransparent>
                    <Link to="/cart">
                        <ButtonTransparent
                            onClick={this.showMiniCart.bind(this)}
                        >
                            {cartBadge}
                            <CartIcon />
                        </ButtonTransparent>
                    </Link>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.data.category,
        currency: state.data.currency.active,
        cart: state.cart,
    };
};

const mapDispatchToProps = {
    setActiveCategory(category) {
        return dataActions.setActiveCategory(category);
    },
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
