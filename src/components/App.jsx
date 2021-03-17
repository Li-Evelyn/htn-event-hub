import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios"
import { history } from "./_helpers";

import { Login } from "./Login";
import { Overview } from "./Overview";
import { EventPage } from "./EventPage";
import { Navigation } from "./Navigation"; 

function App() {

  return (
    <Router history={history}>
      <div id="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Overview}/>
          <Route exact path="/event/:id" component={EventPage}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
