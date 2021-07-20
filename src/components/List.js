import React from "react";
import { Link } from "react-router-dom";

const List = (props) => {
  const { trip } = props;
  return (
    <div>
      <Link to={`/lists/${trip.id}`}>
        {trip.storeName} on {trip.date}
      </Link>
      <br />
      {/* {trip.items.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })} */}
    </div>
  );
};

export default List;
