import { createSlice } from "@reduxjs/toolkit";

/**@type {DataState} */
const initialState = {
    category: { categories: [], active: "" },
    currency: { currencies: [], active: "" },
    products: [],
};

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        //Categories
        setCategories(state, { payload }) {
            state.category.categories = payload;
            state.category.active = payload[0].name;
        },
        setActiveCategory(state, { payload }) {
            state.category.active = payload;
        },

        //Currencies
        setCurrencies(state, { payload }) {
            state.currency.currencies = payload;
            state.currency.active = payload[0].symbol;
        },
        setActiveCurrency(state, { payload }) {
            state.currency.active = payload;
        },

        //Products
        setProducts(state, { payload }) {
            state.products = payload;
        },
    },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
