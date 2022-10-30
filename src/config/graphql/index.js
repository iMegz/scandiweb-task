import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const uri = "http://localhost:4000/";

const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    uri,
});

export function query(name, q) {
    return client.query({
        query: gql`query ${name}{${q}}`,
    });
}

export default client;
