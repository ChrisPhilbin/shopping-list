import { gql } from "@apollo/client";

export const UPDATE_CART_MUTATION = gql`
  mutation InCartMutation($inCart: Boolean!) {
    item(inCart: $inCart) {
      id
      name
      inCart
    }
  }
`;
