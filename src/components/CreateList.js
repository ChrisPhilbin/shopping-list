import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP_MUTATION } from "../mutations/mutations";

const CreateList = (props) => {
  let [formState, setFormState] = useState({
    storeName: "",
    date: "",
  });

  const [createList] = useMutation(CREATE_TRIP_MUTATION, {
    variables: {
      storeName: formState.storeName,
      date: formState.date,
    },
    onCompleted: () => props.history.push("/"),
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
