import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ADD_ITEM_MUTATION } from "../mutations/mutations";

const AddItem = (props) => {
  let [newItem, setNewItem] = useState("");

  const [handleSubmit] = useMutation(ADD_ITEM_MUTATION);

  return (
    <Grid item lg>
      <TextField
        variant="outlined"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Button
        onClick={() =>
          handleSubmit({
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
