import React from "react";
import axios from "axios";

import { withRouter } from "react-router";
// withRouter is used to use history object in the component
// HOC  COMPONENTE DE ALTO NIVEL

import { NavLink } from "react-router-dom";

const NavigationContainer = (props) => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to="/blog" activeClassName="nav-link-active">
          Blog
        </NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    axios
      .delete("https://api.devcamp.space/logout", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch((error) => {
        console.log("Error Signing out", error);
      });
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/about-me" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>
        {/* <a href="./">Wrong Home</a> */}
        {/* sin dinamismo cargaria la pag entera y perderia la funcionalidad */}
        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">
            Contact
          </NavLink>
        </div>
        {/* {true ? "do this" : "do something else"} */}
        {props.loggedInStatus === "LOGGED_IN"
          ? dynamicLink("/blog", "Blog")
          : null}

        {/* <div className="nav-link-wrapper">
          <NavLink to="/blog" activeClassName="nav-link-active">
            Blog
          </NavLink>
        </div> */}

        {/* <button>Contact</button>
            <button>Blog</button> */}
        {/* depende del rol aparecera el boton o no */}
        {/* {true ? <button>Add Blog</button> : null} */}
        {/*  Tendremos en cuenta mas adelante */}
        {/* {false ? <button>Add Blog</button> : null} */}
      </div>
      <div className="right-side">
        BCAMPDAT
        {props.loggedInStatus === "LOGGED_IN" ? (
          <a onClick={handleSignOut}>Sign Out</a>
        ) : null}
        {/* no se usa el this.handleSignOut() porque es un componente funcional */}
      </div>
    </div>
  );
};

export default withRouter(NavigationContainer);
// withRouter is used to use history object in the component NavigationContainer;
