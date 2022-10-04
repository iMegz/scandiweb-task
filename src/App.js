import { Component } from "react";
import { connect } from "react-redux";
import { getCategories, getCurrencies } from "./components/GraphQL/queries";
import Navbar from "./components/navbar/Navbar";
import { dataActions } from "./components/store/dataSlice";
import Container from "./components/UI/Container";

class App extends Component {
    componentDidMount() {
        getCategories().then(({ data }) =>
            this.props.setCategories(data.categories)
        );
        getCurrencies().then(({ data }) =>
            this.props.setCurrencies(data.currencies)
        );
    }
    render() {
        return (
            <Container>
                <Navbar />
            </Container>
        );
    }
}
const mapDispatchToProps = {
    setCategories(categories) {
        return dataActions.setCategories(categories);
    },
    setCurrencies(currencies) {
        return dataActions.setCurrencies(currencies);
    },
};
export default connect(null, mapDispatchToProps)(App);
