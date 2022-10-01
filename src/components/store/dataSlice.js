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
        },
        setActiveCategory(state, { payload }) {
            state.category.active = payload;
        },

        //Currencies
        setCurrencies(state, { payload }) {
            state.currency.currencies = payload;
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
