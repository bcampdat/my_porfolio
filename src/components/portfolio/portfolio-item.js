import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
  // class component
  constructor(props) {
    super(props);

    this.state = {
      portfolioItemClass: "",
    };
  }

  handleMouseEnter() {
    this.setState({ portfolioItemClass: "image-blur" });
  }

  handleMouseLeave() {
    this.setState({ portfolioItemClass: "" });
  }

  render() {
    const { id, description, thumb_image_url, logo_url } = this.props.item;
    // export default class {
    // funcional component

    // Datos que necesitamos
    // desde la api: para nuestra app
    // -blackground images: 'thumb_image_url'
    // -Log
    // -Description: description
    // -ID: id

    return (
      // props list form rendering
      <div
        className="portfolio-item-wrapper"
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        {/* // espera a que ocurra el evento para ejecutar la funcion}} */}

        {/*<h1>{this.state.portfolioItemClass}</h1>  para probar el evento mouse y el efecto blur*/}
        {/* cada unidad de porfolio */}
        {/* <h1>Portfolio Item</h1> */}
        {/* <h1>{props.title}</h1>
      <h1> {props.url}</h1> */}

        {/* <img src={thumb_image_url}  usamos las fotos como fondo/> */}
        <div
          className={
            "portfolio-img-background " + this.state.portfolioItemClass
          }
          style={{
            backgroundImage: "url(" + thumb_image_url + ")",
          }}
        />

        {/* <img src={logo} />
      {/* <Link to={`/portfolio/${props.slug}`}>Link</Link> */}
        {/* incluimos el link con nombre link para todos */}
        {/* <div>{description}</div>
      <Link to={`/portfolio/${id}`}>Link</Link> */}

        {/* cambiamos el diseño */}
        <div className="img-text-wrapper">
          <div className="logo-wrapper">
            <img src={logo_url} />
          </div>

          <div className="subtitle">{description}</div>
        </div>
      </div>
    );
  }
}
