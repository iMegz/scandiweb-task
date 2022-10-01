import cartSlice from "./cartSlice";
import dataSlice from "./dataSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        data: dataSlice.reducer,
    },
});

export default store;
