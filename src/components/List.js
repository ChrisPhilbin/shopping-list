import React from "react";

const List = (props) => {
  const { list } = props;
  return (
    <div>
      {list.storeName} on {list.date} <br />
      {list.items.map((item) => {
        return <li>{item.name}</li>;
      })}
    </div>
  );
};

export default List;
