import React from "react";
import { Link } from "react-router-dom";
import { ButtonFill, ButtonOutline } from "../UI/Buttons";
import Dropdown from "../UI/Dropdown";
import MiniCart from "./MiniCart";
import style from "./MiniCart.module.css";

export class MiniCartDropdown extends Dropdown {
    render() {
        return (
            <div
                onClick={(e) => e.stopPropagation()}
                ref={this.wrapperRef}
                className={style["mini-cart-dropdown"]}
            >
                <MiniCart />
                <div className={style["mini-cart-btns"]}>
                    <Link to="/cart">
                        <ButtonOutline
                            onClick={this.props.hide.bind(this, null)}
                        >
                            View bag
                        </ButtonOutline>
                    </Link>
                    <ButtonFill>Checkout</ButtonFill>
                </div>
            </div>
        );
    }
}

export default MiniCartDropdown;
