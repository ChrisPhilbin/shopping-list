import React from "react";
import { useQuery, gql } from "@apollo/client";

const getAllListItemsQuery = gql`
  query ($id: String!) {
    trip(id: $list_id) {
      items {
        name
        id
        inCart
      }
    }
  }
`;

const ListDetails = (props) => {
  const list_id = props.match.params.list_id;

  const { data } = useQuery(getAllListItemsQuery, {
    variables: {
      id: list_id,
    },
  });

  console.log(data, "data from list details query");

  return (
    <>
      <h3>Details for list...</h3>
    </>
  );
};

export default ListDetails;
