import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./NavLinks.module.css";

export class NavLinks extends Component {
    render() {
        const { categories, active, setActiveCategory } = this.props;
        return (
            <ul className={style["nav-links"]}>
                {categories.map(({ name }) => {
                    const className = `${style["nav-link"]} ${
                        active === name && style.active
                    }`;
                    return (
                        <li key={name}>
                            <Link
                                className={className}
                                to="/products"
                                onClick={setActiveCategory.bind(this, name)}
                            >
                                {name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

export default NavLinks;
