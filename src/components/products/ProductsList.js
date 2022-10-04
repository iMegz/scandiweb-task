import { compose } from "@reduxjs/toolkit";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProductsByCategory } from "../GraphQL/queries";
import ProductCard, { ProductCardTemp } from "./ProductCard";
import style from "./ProductsList.module.css";

export class ProductsList extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }

    componentDidMount() {
        getProductsByCategory(this.props.category).then(({ data }) => {
            const products = data.category.products;
            this.setState({ products });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category) {
            getProductsByCategory(this.props.category).then(({ data }) => {
                const products = data.category.products;
                this.setState({ products });
            });
        }
    }

    displayCards() {
        if (this.state.products.length) {
            return this.state.products.map((product) => (
                <ProductCard
                    key={product.id}
                    {...product}
                    currency={this.props.currency}
                />
            ));
        }
        return Array.from({ length: 6 }, (_, i) => <ProductCardTemp key={i} />);
    }

    render() {
        return (
            <div>
                <h1 className={style.h1}>{this.props.category}</h1>
                <div className={style["products-list"]}>
                    {this.displayCards()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.data.category.active,
        currency: state.data.currency.active,
    };
};
export default connect(mapStateToProps)(ProductsList);
