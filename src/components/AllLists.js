import React from "react";
import List from "./List";
import { useQuery, gql } from "@apollo/client";

const getAllListsQuery = gql`
  {
    trips {
      storeName
      date
      id
    }
  }
`;

const AllLists = (props) => {
  const { data, loading, error } = useQuery(getAllListsQuery);
  console.log(data.trips, "data from query");
  console.log(loading, "loading?");
  console.log(error, "error?");
  return (
    <div>
      {/* {!loading && (
        <>
          {data.trips.map((list) => (
            <List key={list.id} list={list} />
          ))}
        </>
      )} */}
    </div>
  );
};

export default AllLists;
