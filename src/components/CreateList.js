import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const createListMutation = gql`
  mutation ($storeName: String!, $date: String!) {
    addTrip(storeName: $storeName, date: $date) {
      id
      storeName
      date
    }
  }
`;

const CreateList = () => {
  let [formState, setFormState] = useState({
    storeName: "",
    date: "",
  });

  const [createList] = useMutation(createListMutation, {
    variables: {
      storeName: formState.storeName,
      date: formState.date,
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createList();
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Enter the store name"
            onChange={(e) =>
              setFormState({ ...formState, storeName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="MM/DD/YY"
            onChange={(e) =>
              setFormState({ ...formState, date: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateList;
