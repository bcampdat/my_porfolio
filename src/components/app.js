import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PorfolioContainer from "./porfolio/porfolio-container";
import NavigationContainer from "./navigation/navigation-container";

import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";


export default class App extends Component {
  render() {
    return (
      <div className="app">       

        <Router>
          <div>

            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              
            </Switch>

          </div>
        </Router>

        {/* <h1>DevCamp React Starter</h1>
        <h2>React Redux Router</h2> */}
        <h1>My_Porfolio</h1>
        <div>
          {moment().format("MMMM Do YYYY, h:mm:ss a")}
          <PorfolioContainer />
        </div>
      </div>
    );
  }
}
