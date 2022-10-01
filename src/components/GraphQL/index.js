import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const uri = "http://localhost:4000/";

const client = new ApolloClient({ cache: new InMemoryCache(), uri });

/**
 * Send a query
 * @param {String} name - Query name (ex. GetCategories)
 * @param {String} q - Query (ex. categories{name})
 */
export function query(name, q) {
    return client.query({
        query: gql`query ${name}{${q}}`,
    });
}

export default client;
