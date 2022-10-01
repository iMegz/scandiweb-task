/**
 * @typedef {Object} Product
 * @property {String} id
 * @property {String} name
 * @property {String} brand
 * @property {String} description
 * @property {[String]} gallery
 * @property {Boolean} inStock
 * @property {[ProductAttribute]} attributes
 * @property {[ProductPrice]} prices
 */

/**
 * @typedef {Object} ProductPrice
 * @property {String} currency
 * @property {String} amount
 */

/**
 * @typedef {Object} ProductAttribute
 * @property {String} id
 * @property {String} name
 * @property {("text"| "swatch")} type
 * @property {[AttributeItem]} items
 */

/**
 * @typedef {Object} AttributeItem
 * @property {String} id
 * @property {String} value
 * @property {String} displayValue
 */

/**
 * @typedef {Object} CartProduct
 * @property {String} id
 * @property {[CartProductAttribute]} attributes
 * @property {Number} amount
 */

/**
 * @typedef {Object} CartProductAttribute
 * @property {String} id
 * @property {String} value
 */

/**
 * @typedef {Object} Currency
 * @property {String} symbol
 * @property {String} label
 */

/**
 * @typedef {Object} Category
 * @property {String} name
 */

/**
 * @typedef {Object} ProductLogicProps
 * @property {Product} product
 * @property {Boolean} autoUpdate
 */

/**
 * @typedef {Object} DataState
 * @property {Object} category
 * @property {[Category]} category.categories
 * @property {String} category.active
 * @property {Object} currency
 * @property {[Currency]} currency.currencies
 * @property {String} currency.active
 * @property {[Product]} products
 */
