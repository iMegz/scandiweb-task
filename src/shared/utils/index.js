/**
 * Save active currency to localstorage
 * @param {String} currency
 * @returns Active Currency
 */
export function localCurrency(currency) {
    if (currency) localStorage.setItem("currency", currency);
    return localStorage.getItem("currency");
}

/**
 * Save cart to localstorage
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
