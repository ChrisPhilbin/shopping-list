import React from "react";
import List from "./List";

const AllLists = (props) => {
  const someLists = [
    {
      id: "1",
      storeName: "Home Depot",
      date: "7-18-21",
      items: [{ name: "Grout" }, { name: "Wood Putty" }, { name: "paint" }],
    },
  ];
  return (
    <div>
      {someLists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </div>
  );
};

export default AllLists;
