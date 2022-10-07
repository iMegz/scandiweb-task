import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import ProductsList from "../products/ProductsList";
import Container from "../UI/Container";
import ProductPage from "./ProductPage";

export class ProductsPage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Routes>
                        <Route index element={<ProductsList />} />
                        <Route path=":productId" element={<ProductPage />} />
                    </Routes>
                </Container>
            </div>
        );
    }
}

export default ProductsPage;
