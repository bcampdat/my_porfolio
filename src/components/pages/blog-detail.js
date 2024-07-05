import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
    };
  }
  getBlogItem() {
    axios
      .get(
        `https://bcampdat.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`
      )
      .then((response) => {
        // console.log("response", response);
        this.setState({
          blogItem: response.data.portfolio_blog,
        });
      })
      .catch((error) => {
        console.log("getBlogItem error", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }
  render() {
    const { title, content, featured_image_url, blog_status } =
      this.state.blogItem;

    //console.log("currentId", this.state.currentId);
    return (
      <div className="blog-container">
        {/* <div>Blog-detail</div> */}
        {/*  <h1>{title}</h1>
            <img src={featured_image_url} />
            <div>{content}</div> */}
        <div className="content-container">
          <h1>{title}</h1>

          {/* <div className="featured-image-wrapper">
            <img src={featured_image_url} />
          </div>       verificamos si hay foto destacada*/}

          {/* version tradicional   */}
          {/* {featured_image_url ? (
            <div className="featured-image-wrapper">
              <img src={featured_image_url} />
            </div>
          ) : null} */}

          {/* version moderna  */}
          <BlogFeaturedImage img={featured_image_url} />

          {/* <div className="content">{content}</div> */}
          <div className="content">{ReactHtmlParser(content)}</div>
        </div>
      </div>
    );
  }
}