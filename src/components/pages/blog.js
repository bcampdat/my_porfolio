// import React from "react";
import React, { Component, isValidElement } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    // this.activateInfiniteScroll();
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
  }

  // activateInfiniteScroll() {

  // console.log("onscroll");
  // PROPIEDADES DEL NAVEGADOR
  // console.log("window.innerHeight", window.innerHeight);
  // 421px altura del navegador en el usuario
  // console.log(
  //   "document.documentElement.scrollTop",
  //   document.documentElement.scrollTop
  // );
  // cuanto se desplaza el navegador verticalmente
  // console.log(
  //   "document.documentElement.offsetHeight",
  //   document.documentElement.offsetHeight
  // );
  // altura de compensacion   cuan longitud tiene nuestra ventana
  // window.onscroll = () => {
  onScroll() {
    if (
      this.state.isLoading ||
      this.state.blogItems.length === this.state.totalCount
    ) {
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getBlogItems();
      // console.log("get more posts");
    }
  }
  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });

    axios
      .get(
        `https://bcampdat.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log("response from get blog items", response);
        console.log("getting", response.data);
        this.setState({
          // blogItems: response.data.portfolio_blogs,
          blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
          totalCount: response.data.meta.total_records,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getBlogItems error", error);
      });
  }
  UNcomponentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map((blogItem) => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    return (
      <div className="blog-container">
        <div className="content-container">{blogRecords}</div>
        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}

        {/* <h2>Blog</h2> */}

        {/* {blogRecords} */}

        {/* <div>
          <Link to="/about-me">Read more about myself</Link>
        </div> */}
      </div>
    );
  }
}

export default Blog;
