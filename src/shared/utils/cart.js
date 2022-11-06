import { deepCopy } from ".";
import { getProduct } from "../../config/graphql/queries";

/**
 * Restore redux cart from the minimized cart in localstorage
 * @param {[]} cart - Cart stored in localstorage
 * @returns {Promise} Expanded cart
 */
export function decompressCart(cart) {
    //Get unique IDs (there may be 2 products with same id but different attributes)
    const productsIDs = [...new Set(cart.map(({ id }) => id))];

    if (productsIDs.length) {
        //Gather all queries in an array
        const queries = productsIDs.map((id) => getProduct(id));

        //Wait for them to finish
        return Promise.all(queries)
            .then((res) => Promise.resolve(res.map(({ data }) => data)))
            .then((products) => {
                //Merge local cart (amount and selected attribute)
                //with the fetched products (brand, name, ...etc)
                const resultCart = cart.map(({ id, attributes, amount }) => {
                    const temp = deepCopy(
                        products.find(({ product }) => id === product.id)
                    );
                    temp.product.amount = amount;
                    temp.product.attributes.forEach(
                        (attr, i) => (attr.selected = attributes[i].selected)
                    );
                    return temp.product;
                });
                return resultCart;
            });
    } else {
        return Promise.resolve([]);
    }
}

/**
 * Minimze the cart to store it in localstorage
 * @param {[]} cart - Redux cart
 * @returns {[]} Minimized cart
 */
export function compressCart(cart) {
    return cart.map((product) => {
        const attributes = product.attributes.map(({ id, selected }) => {
            return { id, selected };
        });
        return { id: product.id, attributes, amount: product.amount };
    });
}
