import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
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
      // アイテムはキーワードごとに別物として扱いたいため
      // keyFields を無効化して Apollo の正規化キャッシュを避ける
      Item: {
        keyFields: false,
      },
    },
  }),
});
