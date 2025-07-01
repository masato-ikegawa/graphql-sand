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
      /**
       * If you leave keyFields as true (the default), Item objects are normalized in the Apollo cache by their id.
       * The items field itself is cached separately for each keyword because of relayStylePagination(["keyword"]).
       * So, for example, if you first query with keyword: "hoge" and fetch Item:1, the cache will look like this:
       * ```
       * ROOT_QUERY.items({"keyword":"hoge"}) → { edges: [ { node: Item:1 }, ... ] }
       * Item:1 → { id: "1", text: "hoge1", ... }
       * ```
       * This means that when you query again with the same keyword: "hoge" and Item:1, Apollo can serve the result from the cache without hitting the network.
       * However, there’s a catch: if you query with a different keyword but get the same id, the Item:1 entry will be overwritten with the new response.
       * This changes the data for the original keyword too, since they share the same normalized object.
       * For example, if you then query with keyword: "fuga" and get Item:1, the cache becomes:
       * Item:1 → { id: "1", text: "fuga1", ... }
       * So when you query again with keyword: "hoge", Apollo will return { id: "1", text: "fuga1", ... } — which is probably not what you want.
       * To avoid this, the sample sets keyFields: false for Item.
       * This disables normalization, so each Item is stored independently under its parent keyword result.
       * This way, the same id can safely appear in different queries without overwriting each other.
       */
      Item: {
        keyFields: false,
      },
    },
  }),
});
