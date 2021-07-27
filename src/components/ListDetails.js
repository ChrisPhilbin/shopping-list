import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { GET_LIST_ITEMS } from "../quearies/quearies";
import {
  UPDATE_CART_MUTATION,
  ADD_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../mutations/mutations";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item lg>
          {!loading && (
            <h3>
              {data.trip.storeName} on {data.trip.date}
            </h3>
          )}
        </Grid>
        <Grid item lg>
          <TextField
            variant="outlined"
            value={newItem}
            inputProps={{ maxLength: 35 }}
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
                update: (cache, mutationResult) => {
                  const newItem = mutationResult.data.addItem;
                  const data = cache.readQuery({
                    query: GET_LIST_ITEMS,
                    variables: { id: list_id },
                  });
                  console.log(data, "data object from reading query");
                  cache.writeQuery({
                    query: GET_LIST_ITEMS,
                    variables: { id: list_id },
                    data: { trip: { items: [...data.trip.items, newItem] } },
                  });
                },
              })
            }
          >
            Add
          </Button>
        </Grid>
        {!loading && (
          <>
            {data.trip.items.map((item) => (
              <Grid item xs key={item.id}>
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
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    if (window.confirm("Are you sure?")) {
                      deleteItem({
                        variables: { id: item.id },
                        refetchQueries: [
                          { query: GET_LIST_ITEMS, variables: { id: list_id } },
                        ],
                      });
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default ListDetails;
