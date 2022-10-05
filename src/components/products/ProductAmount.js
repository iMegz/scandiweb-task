import React, { Component } from "react";
import { connect } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { ButtonMinus, ButtonPlus } from "../UI/Buttons";
import style from "./ProductAmount.module.css";

export class ProductAmount extends Component {
    render() {
        const { incrementAmount, decrementAmount, id } = this.props;
        const amount = this.props.cart.find((p) => p.id === id)?.amount;
        const size = this.props.size || "medium";
        const dir = this.props.dir || "column";

        return (
            <div
                style={{ flexDirection: dir }}
                className={style["amount-section"]}
            >
                <ButtonPlus
                    size={size}
                    onClick={incrementAmount.bind(this, id)}
                />
                <span className={style[`amount-${size}`]}>{amount}</span>
                <ButtonMinus
                    size={size}
                    onClick={decrementAmount.bind(this, id)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { cart: state.cart };
};

const mapDispatchToProps = {
    incrementAmount(id) {
        return cartActions.incrementAmount(id);
    },
    decrementAmount(id) {
        return cartActions.decrementAmount(id);
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAmount);
