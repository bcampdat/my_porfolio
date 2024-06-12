import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class NavigationContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            
            <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
            <NavLink to="/about" activeClassName="nav-link-active">About</NavLink>

            {/* <a href="./">Wrong Home</a> */}
            {/* sin dinamismo cargaria la pag entera y perderia la funcionalidad */}

            <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
            <NavLink to="/blog" activeClassName="nav-link-active">Blog</NavLink>

            {/* <button>Contact</button>
            <button>Blog</button> */}
            {/* depende del rol aparecera el boton o no */}
            {/* {true ? <button>Add Blog</button> : null} */}
            {false ? <button>Add Blog</button> : null}
            </div>
        )
    }
}