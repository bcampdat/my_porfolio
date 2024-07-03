import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSignOutAlt,
  faEdit,
  faSpinner,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle); // add faTrash, faSignOutAlt;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };
    // loginIn : false,  no daria errores en la app

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("logged in return", response);
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        // If loggedIn and status LOGGED_IN => return data
        // If loggedIn status NOT_LOGGED_IN => update state
        // If not loggedIn and status LOGGED_IN => update state

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedInStatus: "LOGGED_IN",
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route
        key="portfolio-manager"
        path="/portfolio-manager"
        component={PortfolioManager}
      />,
    ];
  }

  render() {
    return (
      // <div className="app">
      <div className="container">
        <Router>
          <div>
            {/* <h1>My_Portfolio</h1> liberamos nav-bar
            <div>{moment().format("MMMM Do YYYY, h:mm:ss a")}</div> */}
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            {/* <h2>{this.state.loggedInStatus}</h2> */}

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
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
              {/* component={Auth} lo vamos a englobar en el render de la ruta */}

              <Route path="/about-me" component={About} />
              <Route path="/contact" component={Contact} />
              {/* <Route path="/blog" component={Blog} /> */}
              <Route
                path="/blog"
                render={(props) => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route path="/b/:slug" component={BlogDetail} />
              {this.state.loggedInStatus === "LOGGED_IN"
                ? this.authorizedPages()
                : null}
              {/* <Route path="/portfolio-manager" component={PortfolioManager} /> */}

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
