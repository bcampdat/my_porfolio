import React from "react";

import { Link } from "react-router-dom";
export default function (props) {
  // funcional component

  // Datos que necesitamos
  // desde la api: para nuestra app
  // -blackground images: 'thumb_image_url'
  // -Log
  // -Description: description
  // -ID: id
  //
  const { id, description, thumb_image_url, logo } = props.item;
  return (
    // props list
    <div>
      {/* <h1>Portfolio Item</h1> */}
      {/* <h1>{props.title}</h1>
      <h1> {props.url}</h1> */}
      <img src={thumb_image_url} />
      <img src={logo} />
      {/* <Link to={`/portfolio/${props.slug}`}>Link</Link> */}
      {/* incluimos el link con nombre link para todos */}
      <div>{description}</div>
      <Link to={`/portfolio/${id}`}>Link</Link>
    </div>
  );
}
