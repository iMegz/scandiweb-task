import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import TempProductCard from "../TempProductCard/TempProductCard";
import style from "./ProductsList.module.css";
import { getProductsByCategory } from "../../../../config/graphql/queries";
import withRouter from "../../../../shared/components/HOC/withRouter";
import NotFound from "../../../../shared/components/NotFound/NotFound";

export class ProductsList extends Component {
    constructor() {
        super();
        this.state = {
            products: null,
        };
    }

    fetchProducts() {
        this.category = this.props.params.category;
        getProductsByCategory(this.category).then(({ data }) => {
            const products = data.category?.products;
            this.setState({ products: products || [] });
        });
    }

    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate() {
        const category = this.props.params.category;
        if (this.category !== category) this.fetchProducts();
    }

    wrapper(content) {
        return (
            <main>
                <h1 className={style["h1"]}>{this.category}</h1>
                {content}
            </main>
        );
    }

    showProduct(id) {
        this.props.navigate(id);
    }

    render() {
        const products = this.state.products;
        if (!products) {
            //Still fetchung
            return this.wrapper(
                <div className={style["products-list"]}>
                    {Array.from({ length: 6 }, (_, i) => (
                        <TempProductCard key={i} />
                    ))}
                </div>
            );
        } else if (!products.length) {
            //No products found
            const msg = `We have searched 404 times but found no products in the
             ${this.category} category`;
            return this.wrapper(<NotFound msg={msg} />);
        } else {
            //Found products
            return this.wrapper(
                <div className={style["products-list"]}>
                    {products.map((product) => {
                        return (
                            <ProductCard
                                showProduct={this.showProduct.bind(
                                    this,
                                    product.id
                                )}
                                key={product.id}
                                product={product}
                            />
                        );
                    })}
                </div>
            );
        }
    }
}

export default withRouter(ProductsList);
