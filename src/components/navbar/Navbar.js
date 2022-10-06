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
import Container from "../UI/Container";
import CurrencySelector from "./CurrencySelector";
import MiniCartDropdown from "../cart/MiniCartDropdown";
import { Overlay } from "../UI/Overlay";

export class Navbar extends Component {
    constructor() {
        super();
        this.state = { selectingCurrency: false, miniCart: false };
    }

    selectCurrency(id) {
        if (!id) {
            const selectingCurrency = !this.state.selectingCurrency;
            this.setState({ selectingCurrency, miniCart: false });
        }
    }

    showMiniCart(id) {
        if (!id) {
            const miniCart = !this.state.miniCart;
            this.setState({ miniCart, selectingCurrency: false });
        }
    }

    render() {
        const cartBadge = this.props.cart.length ? (
            <div className={style["cart-badge"]}>
                <Bagde value={this.props.cart.length} />
            </div>
        ) : null;

        return (
            <div>
                <Container>
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
                            <ButtonTransparent
                                id="currency"
                                onClick={this.selectCurrency.bind(this, null)}
                            >
                                {this.props.currency}{" "}
                                {this.state.selectingCurrency ? (
                                    <Arrow dir="up" />
                                ) : (
                                    <Arrow />
                                )}
                                {this.state.selectingCurrency && (
                                    <CurrencySelector
                                        hide={this.selectCurrency.bind(this)}
                                    />
                                )}
                            </ButtonTransparent>

                            <ButtonTransparent
                                id="miniCart"
                                onClick={this.showMiniCart.bind(this, null)}
                            >
                                {cartBadge}
                                <CartIcon />
                            </ButtonTransparent>
                            {this.state.miniCart && (
                                <>
                                    <MiniCartDropdown
                                        hide={this.showMiniCart.bind(this)}
                                    />
                                    <Overlay />
                                </>
                            )}
                        </div>
                    </nav>
                </Container>
            </div>
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
