import React from "react";

import { Link } from "react-router-dom";
export default function (props) {
  // funcional component
  return (
    // props list
    <div>
      {/* <h1>Portfolio Item</h1> */}
      <h1>{props.title}</h1>
      <h1> {props.url}</h1>

      <Link to={`/portfolio/${props.slug}`}>Link</Link>
      {/* incluimos el link con nombre link para todos */}
    </div>
  );
}
