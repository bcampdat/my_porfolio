import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      // category: "",  con valor por defecto ecomerce si no se elige otro en el select
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.handleThumbDrop = this.handleThumbDrop.bind(this);

    this.handleBannerDrop = this.handleBannerDrop.bind(this);

    this.handleLogoDrop = this.handleLogoDrop.bind(this);

  }

  handleThumbDrop() {
    return {
      // addicion del archivo con DropzoneComponent
      addedfile: (file) => {
        this.setState({
          thumb_image: file,
        });
      },
    };
  }

  handleBannerDrop() {
    return {
      // addicion del archivo con DropzoneComponent
      addedfile: (file) => {
        this.setState({
          banner_image: file,
        });
      },
    };
  }

  handleLogoDrop() {
    return {
      // addicion del archivo con DropzoneComponent
      addedfile: (file) => {
        this.setState({
          logo: file,
        });
      },
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
      // siempre retornara true
      // siempre nos permitira llamarla con verbosHttp
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }
  buildForm() {
    let formData = new FormData();
    // creamos el objeto para el formulario
    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

    if (this.state.thumb_image) {
      // especialmente para imagenes en el formulario
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      // especialmente para imagenes en el formulario
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      // especialmente para imagenes en el formulario
      formData.append("portfolio_item[logo]", this.state.logo);
    }
    // debugger;
    return formData;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log("handle change", event);
  }

  handleSubmit(event) {
    // this.buildForm();
    // console.log("event", event);
    axios
      .post(
        "https://bcampdat.devcamp.space/portfolio/portfolio_items",
        this.buildForm(),
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.props.handleSucessfulFormSubmission(response.data.portfolio_item);
        /* console.log("response", response); */
      })
      .catch((error) => {
        console.log("portfolio error", error);
      }),
      event.preventDefault();
    // eventos sintenticos dom virtual
  }

  render() {
    return (
      <div>
        <h1>PortfolioForm</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Portfolio Item Name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <input
              type="text"
              name="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={this.state.position}
              onChange={this.handleChange}
            />

            {/* <input */}
            <select
              // type="text"
              name="category"
              // placeholder="Category"
              value={this.state.category}
              onChange={this.handleChange}
              // />
            >
              <option value="eComerce">eComerce</option>
              <option value="Scheduling">Scheduling</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>

          <div>
            {/* <input */}
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="image-uploaders">
            {" "}
            {/* para subir imagenes */}
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            />

            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleBannerDrop()}
            />

            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleLogoDrop()}
            />

          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
