import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, Login, PersonalInfo } from '../../containers';

function RouterComponent() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>{" "}
          <Route path="/login">
            <Login />
          </Route>{" "}
          <Route path="/info">
            <PersonalInfo />
          </Route>{" "}
        </Switch>{" "}
      </Router>{" "}
    </div>
  );
}

export default RouterComponent;