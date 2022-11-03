import { configureStore } from "@reduxjs/toolkit";
import currency from "./currency";

export default configureStore({
    reducer: {
        currency,
    },
});
