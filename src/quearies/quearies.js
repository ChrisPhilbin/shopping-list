import { gql } from "@apollo/client";

export const GET_LIST_ITEMS = gql`
  query ($id: ID) {
    trip(id: $id) {
      storeName
      id
      date
      items {
        name
        id
        inCart
      }
    }
  }
`;

export const GET_ALL_LISTS_QUERY = gql`
  {
    trips {
      storeName
      date
      id
      items {
        name
        inCart
        id
      }
    }
  }
`;
