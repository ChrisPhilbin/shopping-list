import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { GET_LIST_ITEMS } from "../quearies/quearies";
import { UPDATE_CART_MUTATION } from "./mutations/mutations";

const ListDetails = (props) => {
  const list_id = props.match.params.list_id;

  const { data, loading } = useQuery(GET_LIST_ITEMS, {
    variables: {
      id: list_id,
    },
  });

  const [handleChange] = useMutation(UPDATE_CART_MUTATION);

  return (
    <>
      <h3>Details for list...</h3>
      <FormGroup row>
        {!loading && (
          <>
            {data.trip.items.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.inCart}
                    onChange={() =>
                      handleChange({
                        variables: { id: item.id, inCart: item.inCart },
                      })
                    }
                    name={item.name}
                    color="primary"
                  />
                }
                label={item.name}
                key={item.id}
              />
            ))}
          </>
        )}
      </FormGroup>
    </>
  );
};

export default ListDetails;
