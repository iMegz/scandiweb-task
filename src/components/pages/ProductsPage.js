import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../products/Product";
import ProductsList from "../products/ProductsList";
import Container from "../UI/Container";

export class ProductsPage extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Routes>
                        <Route index element={<ProductsList />} />
                        <Route path=":productId" element={<Product />} />
                    </Routes>
                </Container>
            </div>
        );
    }
}

export default ProductsPage;
