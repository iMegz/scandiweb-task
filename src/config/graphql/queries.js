import { query } from "./";

export function getCategories() {
    return query("GetCategories", "categories{name}");
}

export function getCurrencies() {
    return query("GetCurrencies", "currencies{label symbol}");
}

export function getProductsByCategory(category) {
    return query(
        "GetProductsByCategory",
        `
        category(input: { title: "${category}" }) {
            products {
              id name brand description gallery inStock
              attributes {id name type items {displayValue value id}}
              prices {currency {symbol}amount}
            }
          }
        `
    );
}

export function getProduct(id) {
    return query(
        "GetProduct",
        `
        product(id:"${id}") {
            id name brand description gallery inStock
            attributes {id name type items {displayValue value id}}
            prices {currency {symbol}amount}
          }
        `
    );
}
