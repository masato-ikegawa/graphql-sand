import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3001/graphql" }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          items: relayStylePagination(["keyword"]),
        },
      },
      // avoid normalization
      Item: {
        keyFields: false,
      },
    },
  }),
});
