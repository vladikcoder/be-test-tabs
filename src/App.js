import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import Tabs from './Tabs.js';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route
          exact path="/"
          render={props => <Redirect to="/1" />}
        />
        <Route
          exact path="/:number"
          component={Tabs}
        />
      </Switch>
    </div>
  );
};

export default App;
