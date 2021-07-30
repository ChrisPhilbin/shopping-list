import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP_MUTATION } from "../mutations/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { GET_ALL_LISTS_QUERY } from "../quearies/quearies";
import Grid from "@material-ui/core/Grid";

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
    update: (cache, mutationResult) => {
      const newTrip = mutationResult.data.addTrip;
      const data = cache.readQuery({
        query: GET_ALL_LISTS_QUERY,
      });
      cache.writeQuery({
        query: GET_ALL_LISTS_QUERY,
        data: { trips: [...data.trips.concat(newTrip)] },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createList();
      }}
    >
      <Grid item align="center">
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
      </Grid>
      <Button onClick={() => createList()}>Create</Button>
    </form>
  );
};

export default CreateList;
