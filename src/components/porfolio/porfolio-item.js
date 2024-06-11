import React from 'react';

export default function (props) {
    // funcional component
    return (
        // props list
        <div>
            {/* <h1>Portfolio Item</h1> */}
            <h1>{props.title}</h1>  
            <h1> {props.url}</h1>
        </div>
    );
}