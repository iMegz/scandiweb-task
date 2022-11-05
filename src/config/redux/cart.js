import { createSlice } from "@reduxjs/toolkit";
import { localCart } from "../../shared/utils";

const initialState = localCart() || [];

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        init(cart, { payload }) {
            cart = localCart() || payload;
        },

        add(cart, { payload }) {
            const inCart = cart.find(({ id, attributes }) => {
                if (id === payload.id) {
                    const oldAttr = attributes.reduce(
                        (prev, { id, selected }) => `${prev}${id}${selected}`,
                        ""
                    );
                    const newAttr = payload.attributes.reduce(
                        (prev, { id, selected }) => `${prev}${id}${selected}`,
                        ""
                    );
                    if (oldAttr === newAttr) return true;
                }
                return false;
            });

            if (inCart) inCart.amount++;
            else {
                payload.amount = 1;
                cart.push(payload);
            }
        },

        remove(cart, { payload }) {
            const index = cart.findIndex(({ id, attributes }) => {
                if (id === payload.id) {
                    const oldAttr = attributes.reduce(
                        (prev, { id, selected }) => `${prev}${id}${selected}`,
                        ""
                    );
                    const newAttr = payload.attributes.reduce(
                        (prev, { id, selected }) => `${prev}${id}${selected}`,
                        ""
                    );
                    if (oldAttr === newAttr) return true;
                }
                return false;
            });

            if (index > -1) {
                if (cart[index].amount === 1) cart.splice(index, 1);
                else cart[index].amount--;
            }
        },

        save(cart) {
            localCart(cart);
        },
    },
});

export default slice.reducer;

export const cartActions = slice.actions;
