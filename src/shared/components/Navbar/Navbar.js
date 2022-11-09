import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.svg";
import MiniCart from "../../../pages/Cart/components/MiniCart/MiniCart";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import style from "./Navbar.module.css";

export class Navbar extends Component {
    render() {
        const links = this.props.categories;

        return (
            <nav className={style["navbar"]}>
                <div className={style["nav-links"]}>
                    <ul>
                        {links.map((link) => (
                            <li key={link} className={style["nav-item"]}>
                                <NavLink
                                    className={({ isActive }) =>
                                        `${style["nav-link"]} ${
                                            isActive ? style["active"] : ""
                                        }`
                                    }
                                    to={link.toLowerCase()}
                                >
                                    {link}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style["logo"]}>
                    <img src={logo} alt="Scandiweb Store" />
                </div>
                <div className={style["actions"]}>
                    <CurrencySelector currencies={this.props.currencies} />
                    <MiniCart />
                </div>
            </nav>
        );
    }
}

export default Navbar;
