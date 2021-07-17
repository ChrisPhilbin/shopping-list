require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();
app.use(cors());

mongoose.connect(
  `mongodb+srv://gqlDbUser:${process.env.DBPASSWORD}@cluster0.hegbi.mongodb.net/shopping-list?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Error connecting to the database!");
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running and listening on port 4000");
});
