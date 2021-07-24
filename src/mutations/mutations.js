import { gql } from "@apollo/client";

export const UPDATE_CART_MUTATION = gql`
  mutation updateItem($id: ID!, $inCart: Boolean!) {
    updateItem(id: $id, inCart: $inCart) {
      id
      name
      inCart
    }
  }
`;
