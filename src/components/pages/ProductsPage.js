import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../products/Product";
import ProductsList from "../products/ProductsList";

export class ProductsPage extends Component {
    render() {
        return (
            <Routes>
                <Route index element={<ProductsList />} />
                <Route path=":productId" element={<Product />} />
            </Routes>
        );
    }
}

export default ProductsPage;
