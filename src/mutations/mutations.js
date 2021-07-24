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

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($name: String!, $tripId: ID!, $inCart: Boolean!) {
    addItem(name: $name, tripId: $tripId, inCart: $inCart) {
      name
      id
      inCart
    }
  }
`;

export const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_LIST_MUTATION = gql`
  mutation deleteTrip($id: ID!) {
    deleteTrip(id: $id) {
      id
      storeName
    }
  }
`;
