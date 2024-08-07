import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

import BlogForm from "../blog/blog-form";

import BlogFeaturedImage from "../blog/blog-featured-image";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false,
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFeaturedImageDelete = this.handleFeaturedImageDelete.bind(this);
    this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(
      this
    );
  }

  handleUpdateFormSubmission(blog) {
    this.setState({
      blogItem: blog,
      editMode: false
    });
  }

  handleFeaturedImageDelete() {
    this.setState({
      blogItem: {
        featured_image_url: "",
      },
    });
  }

  handleEditClick() {
    // console.log("handle edit clicked");
    if (this.props.loggedInStatus === "LOGGED_IN") {
      this.setState({ editMode: true });
    }
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
  //   render() {
  //     const { title, content, featured_image_url, blog_status } =
  //       this.state.blogItem;

  //     //console.log("currentId", this.state.currentId);
  //     return (
  //       <div className="blog-container">
  //         {/* <div>Blog-detail</div> */}
  //         {/*  <h1>{title}</h1>
  //             <img src={featured_image_url} />
  //             <div>{content}</div> */}
  //         <div className="content-container">
  //           <h1>{title}</h1>

  //           {/* <div className="featured-image-wrapper">
  //             <img src={featured_image_url} />
  //           </div>       verificamos si hay foto destacada*/}

  //           {/* version tradicional   */}
  //           {/* {featured_image_url ? (
  //             <div className="featured-image-wrapper">
  //               <img src={featured_image_url} />
  //             </div>
  //           ) : null} */}

  //           {/* version moderna  */}
  //           <BlogFeaturedImage img={featured_image_url} />

  //           {/* <div className="content">{content}</div> */}
  //           <div className="content">{ReactHtmlParser(content)}</div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  render() {
    const { title, content, featured_image_url, blog_status } =
      this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        // return <BlogForm />;
      // if (this.state.editMode && this.props.loggedInStatus === "LOGGED_IN") {
        return (
          // <BlogForm editMode={this.state.editMode} blog={this.state.blogItem} />
          <BlogForm
            handleFeaturedImageDelete={this.handleFeaturedImageDelete}
            handleUpdateFormSubmission={this.handleUpdateFormSubmission}
            editMode={this.state.editMode}
            blog={this.state.blogItem}
          />
        );
      } else {
        return (
          <div className="content-container">
            <h1 onClick={this.handleEditClick}>{title}</h1>

            <BlogFeaturedImage img={featured_image_url} />

            <div className="content">{ReactHtmlParser(content)}</div>
          </div>
        );
      }
    };

    return <div className="blog-container">{contentManager()}</div>;
  }
}
