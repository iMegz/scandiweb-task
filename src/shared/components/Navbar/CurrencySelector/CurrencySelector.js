import React, { Component } from "react";
import { connect } from "react-redux";
import { currencyActions } from "../../../../config/redux/currency";
import Arrow from "../../Arrow/Arrow";
import Button from "../../Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import style from "./CurrencySelector.module.css";

export class CurrencySelector extends Component {
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

    setCurrency(currency) {
        this.props.setActive(currency);
        this.toggle();
    }

    render() {
        return (
            <>
                <Button
                    type="transparent"
                    ref={this.ref}
                    onClick={this.toggle.bind(this)}
                >
                    {this.props.active} &nbsp;
                    <Arrow dir={this.state.show ? "up" : "down"} />
                </Button>
                {this.state.show && (
                    <Dropdown
                        className={style["currencies"]}
                        onClickOutside={this.toggle.bind(this)}
                        btnRef={this.ref}
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
