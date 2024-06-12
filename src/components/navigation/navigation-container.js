import React, { Component } from 'react';

export default class NavigationContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            <button>Home</button>
            <button>About</button>
            <button>Contact</button>
            <button>Blog</button>
            {/* depende del rol aparecera el boton o no */}
            {/* {true ? <button>Add Blog</button> : null} */}
            {false ? <button>Add Blog</button> : null}
            </div>
        )
    }
}