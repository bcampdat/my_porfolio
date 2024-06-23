import React, { Component } from "react";
import axios from "axios";
import PortfolioSidebarList from "../portfolio/portfoli-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  // controlar el trafico
  constructor() {
    super();
    this.state = {
      portfolioItems: [],
    };

    this.handleSucessfulFormSubmission =
      this.handleSucessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleSucessfulFormSubmission(portfolioItem) {
    this.setState({
     /*  portfolioItems: [portfolioItem].push(portfolioItem), */
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems),

      /* cada vez que reciba un array nuevo lo colocara primero */
    });

    // TODO
    // update portfolioItems state
    // and add the portfolioItem to the list
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError", error);
  }
  getPortfolioItems() {
    axios
      /* .get("https://bcampdat.devcamp.space/portfolio/portfolio_items", {
        withCredentials: true,
      }) */
      .get(
        "https://bcampdat.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",
       // mantendra el orden que hemos creado
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log("response from get portfolio items", response);
        this.setState({
          portfolioItems: [...response.data.portfolio_items],
          // .... tenemos que crear un array / sino solo seria 1
        });
      })
      .catch((error) => {
        console.log("error in getPortfolioItems", error);
      });
  }
  // lifecycle methods
  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          {/* <h1>Portfolio Form .....</h1> */}
          <PortfolioForm
            handleSucessfulFormSubmission={this.handleSucessfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
          />
        </div>
        <div className="right-column">
          {/* <h1>Portfolio Sidebar.....</h1> */}
          <PortfolioSidebarList data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
