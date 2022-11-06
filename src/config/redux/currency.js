import { createSlice } from "@reduxjs/toolkit";
import { localCurrency } from "../../shared/utils";

const initialState = {
    active: null,
};

const slice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        init(currency, { payload }) {
            currency.active = localCurrency() || payload.symbol;
        },

        setActive(currency, { payload }) {
            currency.active = payload;
        },

        save(currency) {
            localCurrency(currency.active);
        },
    },
});

export default slice.reducer;

export const currencyActions = slice.actions;
