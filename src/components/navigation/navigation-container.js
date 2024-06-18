import React from "react";

import { NavLink } from "react-router-dom";

const NavigationContainer = (props) => {
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
        <div className="nav-link-wrapper">
          <NavLink to="/blog" activeClassName="nav-link-active">
            Blog
          </NavLink>
        </div>
        {/* <button>Contact</button>
            <button>Blog</button> */}
        {/* depende del rol aparecera el boton o no */}
        {/* {true ? <button>Add Blog</button> : null} */}
        {/*  Tendremos en cuenta mas adelante */}
        {/* {false ? <button>Add Blog</button> : null} */}
      </div>
      <div className="left-side">BCAMPDAT</div>
    </div>
  );
};

export default NavigationContainer;
