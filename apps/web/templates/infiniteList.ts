import { gql } from "@apollo/client";
import { ITEM_FRAGMENT } from "../components/InfiniteList/fragment";
export const INFINITE_ITEMS_QUERY = gql`
  query InfiniteItems($first: Int!, $keyword: String!, $after: String) {
    items(first: $first, keyword: $keyword, after: $after) {
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
