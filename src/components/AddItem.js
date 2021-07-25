import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ADD_ITEM_MUTATION } from "../mutations/mutations";
import { GET_LIST_ITEMS } from "../quearies/quearies";

const AddItem = (props) => {
  let [newItem, setNewItem] = useState("");

  const [createItem] = useMutation(ADD_ITEM_MUTATION, {
    update: (cache, { data: { createItem } }) => {
      const data = cache.readQuery({ query: GET_LIST_ITEMS });
      data.trip.items = [...data.trip.items, createItem];
      cache.writeQuery({ query: GET_LIST_ITEMS }, data);
    },
  });

  return (
    <Grid item lg>
      <TextField
        variant="outlined"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Button
        onClick={() =>
          createItem({
            variables: { name: newItem, tripId: props.list_id, inCart: false },
          })
        }
      >
        Add
      </Button>
    </Grid>
  );
};

export default AddItem;
