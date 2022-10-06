import { createSlice } from "@reduxjs/toolkit";

const oldCart = localStorage.getItem("cart");

/**@type {[CartProduct]}*/
const initialState = oldCart ? JSON.parse(oldCart) : [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //Store cart to localstorage
        storeCart(state) {
            const parsedCart = JSON.stringify(state);
            localStorage.setItem("cart", parsedCart);
        },

        //Increment the amount of product in cart
        incrementAmount(state, { payload }) {
            const product = state.find((p) => p.id === payload);
            product.amount++;
        },

        //Decrement the amount of product in cart or remove it
        decrementAmount(state, { payload }) {
            const index = state.findIndex((p) => p.id === payload);
            if (state[index].amount === 1) state.splice(index, 1);
            else state[index].amount--;
        },

        //Change product attribute
        changeAttribute(state, { payload }) {
            const { productId, attrId, value } = payload;
            const product = state.find((p) => p.id === productId);
            const attribute = product.attributes.find((a) => a.id === attrId);
            attribute.value = value;
        },

        //Add new product to the cart
        addToCart(state, { payload }) {
            state.push(payload);
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
