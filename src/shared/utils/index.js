/**
 * Save active currency to localstorage and return it
 * @param {String} currency
 * @returns Active Currency
 */
export function localCurrency(currency) {
    if (currency) localStorage.setItem("currency", currency);
    return localStorage.getItem("currency");
}

/**
 * Save cart to localstorage and return it
 * @param {[]} cart
 * @returns Cart
 */
export function localCart(cart) {
    if (cart) localStorage.setItem("cart", JSON.stringify(cart));
    return JSON.parse(localStorage.getItem("cart"));
}

export function calcPrice(prices = [], currency = "") {
    return prices
        .find((price) => price.currency.symbol === currency)
        .amount.toFixed(2);
}

export function deepCopy(data = {}) {
    return JSON.parse(JSON.stringify(data));
}
