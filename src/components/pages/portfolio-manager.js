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
      portfolioToEdit: {},
    };

    // this.handleSucessfulFormSubmission =
    //   this.handleSucessfulFormSubmission.bind(this);
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }

  clearPortfolioToEdit() {
    this.setState({
      portfolioToEdit: {},
    });
  }

  handleEditClick(portfolioItem) {
    this.setState({
      portfolioToEdit: portfolioItem,
    });
  }

  handleDeleteClick(portfolioItem) {
    // console.log("handleDeleteClick", portfolioItem);
    axios
      .delete(
        `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log ("response from delete", response);
        // actualiza nuestro estado actual
        this.setState({
          portfolioItems: this.state.portfolioItems.filter((item) => {
            return item.id !== portfolioItem.id;
          }),
        });
        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick", error);
      });
  }

  // handleSucessfulFormSubmission(portfolioItem) {
  handleNewFormSubmission(portfolioItem) {    
  
    this.setState({
      /*  portfolioItems: [portfolioItem].push(portfolioItem), */
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems),

      /* cada vez que reciba un array nuevo lo colocara primero */
    });

    // TODO
    // update portfolioItems state
    // and add the portfolioItem to the list
  }

  handleEditFormSubmission() {
    this.getPortfolioItems();
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
            // handleSucessfulFormSubmission={this.handleSucessfulFormSubmission}
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission = {this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            portfolioToEdit = {this.state.portfolioToEdit}
          />
        </div>
        <div className="right-column">
          {/* <h1>Portfolio Sidebar.....</h1> */}
          {/* <PortfolioSidebarList data={this.state.portfolioItems} /> */}
          <PortfolioSidebarList
            handleDeleteClick={this.handleDeleteClick}
            data={this.state.portfolioItems}
            handleEditClick={this.handleEditClick}
          />
        </div>
      </div>
    );
  }
}
