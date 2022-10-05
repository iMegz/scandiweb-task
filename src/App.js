import { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { getCategories, getCurrencies } from "./components/GraphQL/queries";
import Navbar from "./components/navbar/Navbar";
import CartPage from "./components/pages/CartPage";
import ProductsPage from "./components/pages/ProductsPage";
import { dataActions } from "./components/store/dataSlice";
import Container from "./components/UI/Container";

class App extends Component {
    componentDidMount() {
        getCategories().then(({ data }) =>
            this.props.setCategories(data.categories)
        );
        getCurrencies().then(({ data }) =>
            this.props.setCurrencies(data.currencies)
        );
    }
    render() {
        return (
            <Container>
                <Navbar />
                <Routes>
                    <Route index element={<Navigate to="/products" />} />
                    <Route path="products/*" element={<ProductsPage />} />
                    <Route path="cart" element={<CartPage />} />
                </Routes>
            </Container>
        );
    }
}
const mapDispatchToProps = {
    setCategories(categories) {
        return dataActions.setCategories(categories);
    },
    setCurrencies(currencies) {
        return dataActions.setCurrencies(currencies);
    },
};
export default connect(null, mapDispatchToProps)(App);
