import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { currencyActions } from "../../../config/redux/currency";
import Arrow from "../Arrow/Arrow";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import style from "./CurrencySelector.module.css";

export class CurrencySelector extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
        };
    }

    toggleShow(element) {
        if (element?.id === "currencyBtn") return;
        this.setState({ show: !this.state.show });
    }

    setCurrency(currency) {
        this.props.setActive(currency);
        this.toggleShow();
    }

    render() {
        return (
            <>
                <Button
                    id="currencyBtn"
                    type="transparent"
                    onClick={this.toggleShow.bind(this)}
                >
                    {this.props.active} &nbsp;
                    <Arrow dir={this.state.show ? "up" : "down"} />
                </Button>
                {this.state.show && (
                    <Dropdown
                        className={style["currencies"]}
                        btnRef={this.btnRef}
                        onClickOutside={this.toggleShow.bind(this)}
                    >
                        <div>
                            <ul>
                                {this.props.currencies.map(
                                    ({ symbol, label }) => {
                                        return (
                                            <li
                                                className={style["currency"]}
                                                key={symbol}
                                                onClick={this.setCurrency.bind(
                                                    this,
                                                    symbol
                                                )}
                                            >
                                                {`${symbol} ${label}`}
                                            </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    </Dropdown>
                )}
            </>
        );
    }
}
const mapStateToProps = ({ currency }) => {
    return { active: currency.active };
};
const mapDispatchToProps = {
    setActive(active) {
        return currencyActions.setActive(active);
    },
};
export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
