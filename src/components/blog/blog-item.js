import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";

const BlogItem = (props) => {
  const { id, blog_status, content, title, featured_image_url } =
    props.blogItem;

  return (
    <div>
      <Link to={`/b/${id}`}>
        <h1>{title}</h1>
      </Link>
      {/* <div>{content}</div> */}
      <div>
        <Truncate
          lines={5}
          // nos permite cortar el texto en caso de que sea muy grande y añadir funcion para ver más
          ellipsis={
            <span>
              ...<Link to={`/b/${id}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
          {/* elimina las etiquetas de cadena  p, a, ... */}
        </Truncate>
      </div>
    </div>
  );
};

export default BlogItem;
