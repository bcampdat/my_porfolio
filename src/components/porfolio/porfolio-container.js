import React, { Component } from "react";

import PorfolioItem from "./porfolio-item";

export default class PorfolioContainer extends Component {
  // class component
  constructor() {
    super();
    // da error de compilacion si no se incluye el super
    // Establecer estado inicial
    this.state = {
      pageTitle: "Welcome to my portfolio",
      data: [
        { title: "Quip" },
        { title: "Eventbrite" },
        { title: "Ministry Safe" },
        { title: "SwingAway" },
      ],
      
    };

    // Solucion al error de compilacion lin 62   permitimos el acceso a la funcion handle....
    // siempre que tengas oyente de clicks o eventos tendras que vincular la funcion al componente de esta forma

    this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this); 
  }

  // personal funcional component example
  portfolioItems() {
    // const data = ["Quip", "Eventbrite", "Ministry Safe"]; esta en el estado inicial

    return this.state.data.map((item) => {
      // this.state para que mapee desde el estado inicial
      // return <PorfolioItem />;
      // return <h1>{item}</h1>;
      // props list form rendering
      return <PorfolioItem title={item.title} url={"https://www.google.com"} />;
    });
  }

  handlePageTitleUpdate() {
    this.setState({
      pageTitle: "Something Else",
    });
  }
  render() {
    return (
      <div>
        <h1>{this.state.pageTitle}</h1>
        {/* acceso al estado inicial */}

        {this.portfolioItems()}

        {/*   <div>
                <h2>Portfolio items go here...</h2>
                call personal funcional component 
                {this.portfolioItems()}
                <PorfolioItem /> 
              </div>  */}

        <hr />

        <button onClick={this.handlePageTitleUpdate}>Change Title</button>
      </div>
        //  nos da error de compilacion setState 

    );
  }
}
