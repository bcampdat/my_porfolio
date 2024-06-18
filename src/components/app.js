import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";

import About from "./pages/about";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import Home from "./pages/home";
import NoMatch from "./pages/no-match.js";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      // loginIn : false,  no daria errores en la app
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);

  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnSuccessfulLogin () {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  };

  render() {
    return (
      // <div className="app">
      <div className="container">
        <Router>
          <div>
            {/* <h1>My_Portfolio</h1> liberamos nav-bar
            <div>{moment().format("MMMM Do YYYY, h:mm:ss a")}</div> */}
            <NavigationContainer />

            <h2>{this.state.loggedInStatus}</h2>

            <Switch>
              {/*  pages */}
              {/* importante el orden de las rutas de 1º a la ultima no-match */}
              <Route exact path="/" component={Home} />

              <Route
                path="/auth"
                render={(props) => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                  />
                )}
                // component={Auth} lo vamos a englobar en el render de la ruta
              />

              <Route path="/about-me" component={About} />

              <Route path="/contact" component={Contact} />

              <Route path="/blog" component={Blog} />

              <Route
                exact
                path="/portfolio/:slug"
                component={PortfolioDetail}
              />
              {/* nos permite englobar varias terminacion de la ruta */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>

        {/* <h1>DevCamp React Starter</h1>
        <h2>React Redux Router</h2> */}
      </div>
    );
  }
}
