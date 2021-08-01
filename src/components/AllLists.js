import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_LISTS_QUERY } from "../quearies/quearies";
import { DELETE_LIST_MUTATION } from "../mutations/mutations";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import CreateList from "./CreateList";

const useStyles = makeStyles((theme) => ({
  createList: {
    margin: 10,
  },
  listPaper: {
    padding: 20,
    marging: 15,
  },
  mainDiv: {
    marginLeft: 20,
    marginRight: 20,
  },
}));

const AllLists = (props) => {
  const classes = useStyles();

  const { data } = useQuery(GET_ALL_LISTS_QUERY);
  const [deleteList] = useMutation(DELETE_LIST_MUTATION);

  return (
    <div className={classes.mainDiv}>
      <Grid container direction={"row"} spacing={3}>
        <Grid item xs={12} align="center">
          <CreateList props={props} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {data && (
          <>
            {data.trips.map((trip) => (
              <Grid item xs={3} key={trip.id}>
                <Paper elevation={3} className={classes.listPaper}>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      deleteList({
                        variables: { id: trip.id },
                        refetchQueries: [{ query: GET_ALL_LISTS_QUERY }],
                      })
                    }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Link to={`/lists/${trip.id}`}>
                    {trip.storeName} on {trip.date}
                  </Link>
                </Paper>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default AllLists;
