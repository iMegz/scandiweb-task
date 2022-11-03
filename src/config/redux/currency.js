import { createSlice } from "@reduxjs/toolkit";
import { localCurrency } from "../../shared/utils";

const initialState = {
    active: null,
};

const slice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        init(state, { payload }) {
            state.active = localCurrency() || payload;
        },

        setActive(state, { payload }) {
            state.active = payload;
        },

        save(state) {
            localCurrency(state.active);
        },
    },
});

export default slice.reducer;

export const currencyActions = slice.actions;
