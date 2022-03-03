import { gql } from "@apollo/client";

export const DASHBOARD = gql`
  query Query {
    dashboard {
      id
      firstName
      lastName
      username
      email
      images {
        id
        title
        description
        imageUrl
      }
    }
  }
`;
