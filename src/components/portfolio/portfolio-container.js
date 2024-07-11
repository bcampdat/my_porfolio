import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  // class component
  constructor() {
    super();
    // da error de compilacion si no se incluye el super
    // Establecer estado inicial
    // isLoading: true, // condicional del render  nos cargaria los datos de una api por ejemplo
    // para que aparezca data y continuar aprendiendo....
    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: [],
    };

    // Solucion al error de compilacion lin 62   permitimos el acceso a la funcion handle....
    // siempre que tengas oyente de clicks o eventos tendras que vincular la funcion al componente de esta forma

    // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

    this.handleFilter = this.handleFilter.bind(this);
    // this.getPorfolioItems = this.getPorfolioItems.bind(this);
  }

  handleFilter(filter) {
    // this.setState({
    //   data: this.state.data.filter((item) => {
    //     return item.category === filter;
    //   }),
    // });
    if (filter === "CLEAR_FILTERS") {
      this.getPortfolioItems();
    } else {
      this.getPortfolioItems(filter);
    }
  }

  // getPortfolioItems() {
  getPortfolioItems(filter = null) {
    axios
      .get("https://bcampdat.devcamp.space/portfolio/portfolio_items")
      .then((response) => {
        // handle success
        // console.log("response data", response);
        // this.setState({
        //   data: response.data.portfolio_items,
        // });
        if (filter) {
          this.setState({
            data: response.data.portfolio_items.filter((item) => {
              return item.category === filter;
            }),
          });
        } else {
          this.setState({
            data: response.data.portfolio_items,
          });
        }
      })
      .catch((error) => {
        console.log("error in getPortfolioItems", error);
      });
  }

  // personal funcional component example
  portfolioItems() {
    // const data = ["Quip", "Eventbrite", "Ministry Safe"]; esta en el estado inicial

    return this.state.data.map((item) => {
      // this.state para que mapee desde el estado inicial
      // return <PorfolioItem />;
      // return <h1>{item}</h1>;
      // props list form rendering
      // console.log ("Portfolio item", item);

      // navegador  Object.keys(item); nos ayuda con la lista de los items necesarios en porfolio-item

      return <PortfolioItem key={item.id} item={item} />;
      // title={item.name}
      // url={item.url}
      // slug={item.id}
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  // version actual de ComponentDidMount

  // import React, { useEffect } from 'react';

  // function Foo_ComponentDidMount() {
  //   useEffect(() => {
  //     const getPorfolioItems = async () => {
  //       // Lógica para obtener los elementos del portafolio
  //     };

  //     getPorfolioItems();

  //     // Esta función de limpieza se ejecutará antes de desmontar el componente
  //     return () => {
  //       // Código de limpieza, si es necesario
  //     };
  //   }, []); // El array vacío [] indica que el efecto se ejecutará solo una vez, al montar el componente
  // }
  // handlePageTitleUpdate() {
  //   this.setState({
  //     pageTitle: "Something Else",
  //   });
  // }

  // handle indica que es un evento click

  render() {
    // condicionales detenemos render para el condicional y continuar
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      /* <h1>{this.state.pageTitle}</h1> */
      /* acceso al estado inicial */

      // <div className="portfolio-items-wrapper">
      //   <button className="btn" onClick={() => this.handleFilter("eCommerce")}>
      //     eCommerce
      //   </button>
      //   <button className="btn" onClick={() => this.handleFilter("Scheduling")}>
      //     Scheduling
      //   </button>
      //   <button className="btn" onClick={() => this.handleFilter("Enterprise")}>
      //     Enterprise
      //   </button>

      //   {this.portfolioItems()}

      // {/* todas las unidades de porfolio */}

      //   {/*   <div>
      //           <h2>Portfolio items go here...</h2>
      //           call personal funcional component
      //           {this.portfolioItems()}
      //           <PorfolioItem />
      //         </div>  */}

      //   {/* <hr />

      //   <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}

      //   {/* //  nos da error de compilacion setState */}

      <div className="homepage-wrapper">
        <div className="filter-links">
          <button
            className="btn"
            onClick={() => this.handleFilter("eCommerce")}
          >
            eCommerce
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Scheduling")}
          >
            Scheduling
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("Enterprise")}
          >
            Enterprise
          </button>
          <button
            className="btn"
            onClick={() => this.handleFilter("CLEAR_FILTERS")}
          >
            All
          </button>
        </div>
        <div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
      </div>
    );
  }
}
