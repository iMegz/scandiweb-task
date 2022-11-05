import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getCategories, getCurrencies } from "./config/graphql/queries";
import { cartActions } from "./config/redux/cart";
import { currencyActions } from "./config/redux/currency";
import CartPage from "./pages/Cart/CartPage";
import LoadingPage from "./pages/Loading/LoadingPage";
import Product from "./pages/Products/components/Product/Product";
import ProductsList from "./pages/Products/components/ProductsList/ProductsList";
import ProductsPage from "./pages/Products/ProductsPage";
import Navbar from "./shared/components/Navbar/Navbar";

export class App extends Component {
    constructor() {
        super();
        this.state = {
            categories: [],
            currencies: [],
        };
    }

    componentDidMount() {
        getCategories().then(({ data }) =>
            this.setState({ categories: data.categories.map((c) => c.name) })
        );

        getCurrencies().then(({ data }) => {
            this.setState({ currencies: data.currencies }, () => {
                this.props.initCurrency(this.state.currencies[0]);
            });
        });

        window.addEventListener("beforeunload", () => {
            this.props.saveCurrency();
            this.props.saveCart();
        });
    }

    render() {
        const { categories, currencies } = this.state;
        const loaded = categories.length && currencies.length;
        return (
            <div className="container">
                {!loaded && <LoadingPage />}
                {loaded && (
                    <Navbar
                        currencies={this.state.currencies}
                        categories={this.state.categories}
                    />
                )}
                {loaded && (
                    <Routes>
                        <Route
                            index
                            element={
                                <Navigate to={`/${this.state.categories[0]}`} />
                            }
                        />
                        <Route path="cart" element={<CartPage />} />
                        <Route path=":category" element={<ProductsPage />}>
                            <Route index element={<ProductsList />} />
                            <Route path=":product" element={<Product />} />
                        </Route>
                    </Routes>
                )}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currency: state.currency.active,
    };
};

const mapDispatchToProps = {
    initCurrency(currency) {
        return currencyActions.init(currency);
    },

    saveCurrency() {
        return currencyActions.save();
    },

    saveCart() {
        return cartActions.save();
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
