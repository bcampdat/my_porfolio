// import React from "react";
import React, { Component } from "react";

import axios from "axios";

// export default function (props) {
//   return (
//     <div>
//       <h2>Portfolio-detail for {props.match.params.slug}</h2>
//       {/* indicamos los parametros del link */}
//     </div>
//   );
// }

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {},
    };
  }

  componentWillMount() {
    this.getPortfolioItem();
  }

  getPortfolioItem() {
    axios
      .get(
        `https://bcampdat.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
        { withCredentials: true }
      )
      .then((response) => {
        // console.log("res", response);
        this.setState({
          portfolioItem: response.data.portfolio_item,
        });
      })
      .catch((error) => {
        console.log("getportfolioitem error", error);
      });
  }

  render() {
    const {
      banner_image_url,
      category,
      description,
      logo_url,
      name,
      thumb_image_url,
      url,
    } = this.state.portfolioItem;

    
    const bannerStyles = {
      backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    };

    const logoStyles = {
      width: "200px",
    };

    return (
      <div className="portfolio-detail-wrapper">

        {/* <h2>Portfolio Detail for {this.props.match.params.slug}</h2> */}
        {/* <h2>{name}</h2>
        <p>{description}</p> */}

        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles} />
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div className="description">{description}</div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className="site-link" target="_blank">
            Visit {name}
          </a>
        </div>
      </div>
    );
  }
}
