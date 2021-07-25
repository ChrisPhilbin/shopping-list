import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { GET_LIST_ITEMS } from "../quearies/quearies";
import {
  UPDATE_CART_MUTATION,
  ADD_ITEM_MUTATION,
} from "../mutations/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ListDetails = (props) => {
  let [newItem, setNewItem] = useState("");

  const list_id = props.match.params.list_id;

  const { data, loading } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id: list_id,
    },
  });

  const [handleChange] = useMutation(UPDATE_CART_MUTATION);

  const [createItem] = useMutation(ADD_ITEM_MUTATION);

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item lg>
          <h3>Details for list...</h3>
        </Grid>
        <Grid item lg>
          <TextField
            variant="outlined"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <Button
            onClick={() =>
              createItem({
                variables: {
                  name: newItem,
                  tripId: list_id,
                  inCart: false,
                },
                refetchQueries: [
                  { query: GET_LIST_ITEMS, variables: { id: list_id } },
                ],
              })
            }
          >
            Add
          </Button>
        </Grid>
        {!loading && (
          <>
            {data.trip.items.map((item) => (
              <Grid item xs>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.inCart}
                      onChange={() =>
                        handleChange({
                          variables: { inCart: !item.inCart, id: item.id },
                        })
                      }
                      name={item.name}
                      color="primary"
                    />
                  }
                  label={item.name}
                  style={
                    item.inCart
                      ? { color: "red", textDecoration: "line-through" }
                      : null
                  }
                  key={item.id}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default ListDetails;
