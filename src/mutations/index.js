import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`;
