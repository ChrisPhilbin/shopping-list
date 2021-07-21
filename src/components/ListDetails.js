import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_LIST_ITEMS = gql`
  query ($id: ID) {
    trip(id: $id) {
      id
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

  const { data, loading, error } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id: list_id,
    },
  });

  console.log(data, "data from list details query");
  console.log(loading, "loading?");
  console.log(error, "error?");

  return (
    <>
      <h3>Details for list...</h3>
      {!loading && (
        <>
          {data.trip.items.map((item) => (
            <li>{item.name}</li>
          ))}
        </>
      )}
    </>
  );
};

export default ListDetails;
