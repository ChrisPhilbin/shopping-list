import React from "react";
import List from "./List";
import ListDetails from "./ListDetails";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const getAllListsQuery = gql`
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

const AllLists = (props) => {
  const { data } = useQuery(getAllListsQuery);
  return (
    <div>
      {data && (
        <>
          {data.trips.map((trip) => (
            <>
              <Link to={`/lists/${trip.id}`}>
                {trip.storeName} on {trip.date}
              </Link>
              <br />
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default AllLists;
