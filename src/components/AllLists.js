import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_LISTS_QUERY } from "../quearies/quearies";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listPaper: {
    padding: 20,
    marging: 15,
  },
}));

const AllLists = (props) => {
  const classes = useStyles();

  const { data } = useQuery(GET_ALL_LISTS_QUERY);
  return (
    <Grid container spacing={3}>
      {data && (
        <>
          {data.trips.map((trip) => (
            <Grid item xs={3}>
              <Paper elevation="5" className={classes.listPaper}>
                <IconButton aria-label="delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <Link to={`/lists/${trip.id}`} key={trip.id}>
                  {trip.storeName} on {trip.date}
                </Link>
              </Paper>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

export default AllLists;
