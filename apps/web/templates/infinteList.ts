import { gql } from "@apollo/client";
import { ITEM_FRAGMENT } from "../components/InfinteList/fragment";

export const INFINTE_ITEMS_QUERY = gql`
  query InfinteItems($first: Int!, $after: String) {
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
