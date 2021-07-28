import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP_MUTATION } from "../mutations/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createList();
      }}
    >
      <div>
        <TextField
          label="List name"
          placeholder="Enter list name"
          variant="outlined"
          onChange={(e) =>
            setFormState({ ...formState, storeName: e.target.value })
          }
        />

        <TextField
          label="Date"
          placeholder="MM/DD/YY"
          variant="outlined"
          onChange={(e) => setFormState({ ...formState, date: e.target.value })}
        />
        <Button onClick={() => createList()}>Create</Button>
      </div>
    </form>
  );
};

export default CreateList;
