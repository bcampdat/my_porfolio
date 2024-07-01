// import React from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";

// export default function () {
//   return (
//     <div>
//       <h2>Blog</h2>

//       <div>
//         <Link to="/about-me">Read more myself</Link>
//       </div>
//     </div>
//   );
// }
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      blogItems: [],
    };
    this.getBlogItems = this.getBlogItems.bind(this);
  }
  getBlogItems() {
    axios
      .get("https://bcampdat.devcamp.space/portfolio/portfolio_blogs", {
        withCredentials: true,
      })
      .then((response) => {
        // console.log("response from get blog items", response);
        this.setState({
          blogItems: response.data.portfolio_blogs,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  }
  componentWillMount() {
    this.getBlogItems();
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });
    return (
      <div className="blog-container">
        <div className="content-container">{blogRecords}</div>

        {/* <h2>Blog</h2> */}

        {blogRecords}

        {/* <div>
          <Link to="/about-me">Read more about myself</Link>
        </div> */}
      </div>
    );
  }
}

export default Blog;
