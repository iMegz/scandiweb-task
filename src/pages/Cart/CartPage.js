import React, { Component } from "react";
import { connect } from "react-redux";
import { getProduct } from "../../config/graphql/queries";
import NotFound from "../../shared/components/NotFound/NotFound";
import { deepCopy } from "../../shared/utils";
import LoadingPage from "../Loading/LoadingPage";
import style from "./CartPage.module.css";
import CartCard from "./components/CartCard/CartCard";

export class CartPage extends Component {
    constructor() {
        super();
        this.state = {
            cart: null,
        };
    }
    updateCart() {
        const cart = this.props.cart;

        //Get unique IDs (there may be 2 products with same id but different attributes)
        const productsIDs = [...new Set(cart.map(({ id }) => id))];

        if (productsIDs.length) {
            //Gather all queries in an array
            const queries = productsIDs.map((id) => getProduct(id));

            //Wait for them to finish
            Promise.all(queries)
                .then((res) => Promise.resolve(res.map(({ data }) => data)))
                .then((products) => {
                    //Merge redux cart (amount and selected attribute)
                    //with the fetched products (brand, name, ...etc)
                    const resultCart = cart.map(
                        ({ id, attributes, amount }) => {
                            const temp = deepCopy(
                                products.find(
                                    ({ product }) => id === product.id
                                )
                            );
                            temp.product.amount = amount;
                            temp.product.attributes.forEach(
                                (attr, i) =>
                                    (attr.selected = attributes[i].selected)
                            );
                            return temp.product;
                        }
                    );
                    this.setState({ cart: resultCart });
                });
        } else {
            this.setState({ cart: [] });
        }
    }
    componentDidMount() {
        this.updateCart();
    }

    componentDidUpdate(prevProps, prevState) {
        /*The component updates only when curreny or redux cart changes
        If both prev and current carts are the same then there is
        an untracked change so we update
        Another way is to compare current state to the redux cart but 
        componentDidUpdate will run in the initial update of the 
        cart (not initial render but before first state is set) but 
        this will be more dificult because redux cart contain less info about 
        products so its always different from state cart*/
        const cart = this.state.cart;
        const currency = this.props.currency;
        if (
            cart && //Skip when cart is null
            prevProps.currency === currency && //Ignore currency change
            prevState.cart === cart //Care about untracked change
        ) {
            this.updateCart();
        }
    }

    render() {
        const cart = this.state.cart;
        if (!cart) return <LoadingPage />;
        else if (!cart.length)
            return (
                <main>
                    <h1 className={style["h1"]}>Cart</h1>
                    <hr className={style["hr"]} />{" "}
                    <NotFound msg="Your cart is empty" />
                </main>
            );
        else
            return (
                <main>
                    <h1 className={style["h1"]}>Cart</h1>
                    <hr className={style["hr"]} />
                    {cart.map((product, i) => (
                        <React.Fragment key={i}>
                            <CartCard
                                product={product}
                                currency={this.props.currency}
                            />
                            <hr className={style["hr"]} />
                        </React.Fragment>
                    ))}
                </main>
            );
    }
}

const mapStateToProps = ({ cart, currency }) => {
    return { cart, currency: currency.active };
};

export default connect(mapStateToProps)(CartPage);
