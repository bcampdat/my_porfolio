import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  // class component
  constructor() {
    super();
    // da error de compilacion si no se incluye el super
    // Establecer estado inicial
    this.state = {
      pageTitle: "Welcome to my portfolio",
      // isLoading: true, // condicional del render  nos cargaria los datos de una api por ejemplo
      isLoading: false,  // para que aparezca data y continuar aprendiendo.....
      data: [
        { title: "Quip", category: "eCommerce",slug:"quip" },
        { title: "Eventbrite", category: "Scheduling" , slug:"eventbrite"},
        { title: "Ministry Safe", category: "Enterprise" , slug:"ministry-safe"},
        { title: "SwingAway", category: "eCommerce", slug:"swingaway"},
      ],
    };

    // Solucion al error de compilacion lin 62   permitimos el acceso a la funcion handle....
    // siempre que tengas oyente de clicks o eventos tendras que vincular la funcion al componente de esta forma

    // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

    this.handleFilter = this.handleFilter.bind(this);
  }

  // personal funcional component example
  portfolioItems() {
    // const data = ["Quip", "Eventbrite", "Ministry Safe"]; esta en el estado inicial

    return this.state.data.map((item) => {
      // this.state para que mapee desde el estado inicial
      // return <PorfolioItem />;
      // return <h1>{item}</h1>;
      // props list form rendering
      return <PortfolioItem title={item.title} url={"https://www.google.com"} slug ={item.slug} />;
    });
  }

  // handlePageTitleUpdate() {
  //   this.setState({
  //     pageTitle: "Something Else",
  //   });
  // }

  // handle indica que es un evento click
  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter((item) => {
        return item.category === filter;
      }),
    });
  }
  render() {
    // condicionales detenemos render para el condicional y continuar
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>{this.state.pageTitle}</h1>
        {/* acceso al estado inicial */}

        <button onClick={() => this.handleFilter("eCommerce")}>
          eCommerce
        </button>
        <button onClick={() => this.handleFilter("Scheduling")}>
          Scheduling
        </button>
        <button onClick={() => this.handleFilter("Enterprise")}>
          Enterprise
        </button>

        {this.portfolioItems()}

        {/*   <div>
                <h2>Portfolio items go here...</h2>
                call personal funcional component 
                {this.portfolioItems()}
                <PorfolioItem /> 
              </div>  */}

        {/* <hr />

        <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}
      </div>
      //  nos da error de compilacion setState
    );
  }
}
