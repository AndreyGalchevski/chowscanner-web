import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import "./App.css";

import Navigation from "./features/layout/Navigation";
import MainMap from "./features/feedSpot/MainMap";
import About from "./features/about/About";
import Contact from "./features/contact/Contact";

const App = () => {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <Navigation showSearchBar={pathname === "/"} />
      <Switch>
        <Route exact path="/" component={MainMap} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
      </Switch>
    </div>
  );
};

export default App;
