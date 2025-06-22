import { gql } from "@apollo/client";
import { HELLO_MESSAGE } from "../components/Hello/fragment";

export const HELLO_QUERY = gql`
  query Hello {
    ...HelloMessage
  }
  ${HELLO_MESSAGE}
`;
