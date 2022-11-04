import React, { Component } from "react";
import { Outlet } from "react-router-dom";

export class ProductsPage extends Component {
    render() {
        return <Outlet />;
    }
}

export default ProductsPage;
