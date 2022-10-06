import React from "react";
import { connect } from "react-redux";
import { dataActions } from "../store/dataSlice";
import Dropdown from "../UI/Dropdown";
import style from "./CurrencySelector.module.css";

export class CurrencySelector extends Dropdown {
    render() {
        return (
            <div ref={this.wrapperRef} className={style["currency-selector"]}>
                {this.props.currencies.map(({ symbol, label }) => (
                    <div
                        onClick={this.props.changeCurrency.bind(this, symbol)}
                        key={symbol}
                        className={style["currency"]}
                    >{`${symbol} ${label}`}</div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { currencies: state.data.currency.currencies };
};

const mapDispatchToProps = {
    changeCurrency(currency) {
        return dataActions.setActiveCurrency(currency);
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
