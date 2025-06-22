import { gql } from "@apollo/client";

export const HELLO_MESSAGE = gql`
  fragment HelloMessage on Query {
    hello
  }
`;
