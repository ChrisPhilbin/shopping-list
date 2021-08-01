import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRIP_MUTATION } from "../mutations/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { GET_ALL_LISTS_QUERY } from "../quearies/quearies";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formElement: {
    margin: 10,
  },
  submitButton: {
    position: "relative",
    marinTop: "10px",
  },
}));

const CreateList = (props) => {
  const classes = useStyles();

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
      className={classes.createForm}
    >
      <div>
        <TextField
          className={classes.formElement}
          label="List name"
          placeholder="Enter list name"
          variant="outlined"
          onChange={(e) =>
            setFormState({ ...formState, storeName: e.target.value })
          }
        />

        <TextField
          className={classes.formElement}
          label="Date"
          placeholder="MM/DD/YY"
          variant="outlined"
          onChange={(e) => setFormState({ ...formState, date: e.target.value })}
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          onClick={() => createList()}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateList;
