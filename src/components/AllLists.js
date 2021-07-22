import React from "react";
import List from "./List";
import ListDetails from "./ListDetails";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { GET_ALL_LISTS_QUERY } from "../quearies/quearies";

const AllLists = (props) => {
  const { data } = useQuery(GET_ALL_LISTS_QUERY);
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
