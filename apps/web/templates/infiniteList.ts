import { gql } from "@apollo/client";
import { ITEM_FRAGMENT } from "../components/InfiniteList/fragment";
export const INFINITE_ITEMS_QUERY = gql`
  query InfiniteItems($first: Int!, $after: String) {
    items(first: $first, after: $after) {
      edges {
        node {
          ...ItemFragment
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ITEM_FRAGMENT}
`;
