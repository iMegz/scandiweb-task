import { configureStore } from "@reduxjs/toolkit";
import currency from "./currency";
import cart from "./cart";

export default configureStore({
    reducer: {
        currency,
        cart,
    },
});
