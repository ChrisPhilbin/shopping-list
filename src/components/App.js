import React from "react";
import AllLists from "./AllLists";
import CreateList from "./CreateList";
import ListDetails from "./ListDetails";
import TopNav from "./navigation/TopNav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <TopNav />
        <Switch>
          <Route exact path="/" component={AllLists} />
          <Route exact path="/lists/new" component={CreateList} />
          <Route exact path="/lists/:list_id" component={ListDetails} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
