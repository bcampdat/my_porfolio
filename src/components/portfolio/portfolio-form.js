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
      // axios dynamic
      editMode: false,
      apiUrl: "https://bcampdat.devcamp.space/portfolio/portfolio_items",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.handleThumbDrop = this.handleThumbDrop.bind(this);

    this.handleBannerDrop = this.handleBannerDrop.bind(this);

    this.handleLogoDrop = this.handleLogoDrop.bind(this);

    this.deleteImage = this.deleteImage.bind(this);

    // referencias

    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();
  }

  deleteImage(imageType) {
    axios.delete(
      `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
      { withCredentials: true }
    ).then(response => {
      // console.log("deleteImage ", response);
      this.setState({
        [`${imageType}_url`]: ""
      });
    }).catch(error => {
      console.log("deleteImage error", error);
    });
  }

  // if (Obj1.keys(Obj2).length) {

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        id,
        name,
        description,
        category,
        position,
        url,
        thumb_image_url,
        banner_image_url,
        logo_url,
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      this.setState({
        id: id,
        name: name || "",
        description: description || "",
        category: category || "eCommerce",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://bcampdat.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch",
        thumb_image_url: thumb_image_url || "",
        banner_image_url: banner_image_url || "",
        logo_url: logo_url || "",
      });
    }
  }

  handleThumbDrop() {
    return {
      addedfile: (file) => this.setState({ thumb_image: file }),
    }; // addicion del archivo con DropzoneComponent
  }

  handleBannerDrop() {
    return {
      addedfile: (file) => this.setState({ banner_image: file }),
    }; // addicion del archivo con DropzoneComponent
  }

  handleLogoDrop() {
    return {
      addedfile: (file) => this.setState({ logo: file }),
    }; // addicion del archivo con DropzoneComponent
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }
  // siempre retornara true
  // siempre nos permitira llamarla con verbosHttp

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
  }
  // console.log("handle change", event);

  handleSubmit(event) {
    // this.buildForm();
    // console.log("event", event);

    // axios dynamic
    // axios
    //   .post(
    //     "https://bcampdat.devcamp.space/portfolio/portfolio_items",
    //     this.buildForm(),
    //     {
    //       withCredentials: true,
    //     }
    //   )

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true,
    })
      .then((response) => {
        if (this.state.editMode) {
          // === true
          this.props.handleEditFormSubmission();
        } else {
          this.props.handleNewFormSubmission(response.data.portfolio_item);
        }
        // this.props.handleSucessfulFormSubmission(response.data.portfolio_item);
        /* console.log("response", response); */

        this.setState({
          name: "",
          description: "",
          category: "eCommerce",
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: "",
          editMode: false,
          apiUrl: "https://jordan.devcamp.space/portfolio/portfolio_items",
          apiAction: "post",
        });

        // inside DOM
        [this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("portfolio form handleSubmit error", error);
      });

    event.preventDefault();
  }
  // eventos sintenticos dom virtual

  render() {
    return (
      // <div>
      //   <h1>PortfolioForm</h1>
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
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

        <div className="two-column">
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
            className="select-element"
            // />
          >
            <option value="eComerce">eComerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <div className="one-column">
          {/* <input */}
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        {/* <div className="image-uploaders three-column"> 
        
         {true ? ( si es true : si es false )}*/}

        <div className="image-uploaders">
          {this.state.thumb_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.thumb_image_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("thumb_image")}>
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            // {" "}
            // {/* para subir imagenes */}
            <DropzoneComponent
              ref={this.thumbRef}
              //llamamos a las refs
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            >
              {/* <div className="dz-message">clase de Dropzone que machacamos</div> */}
              <div className="dz-message">Thumbnail</div>
            </DropzoneComponent>
          )}

          {this.state.banner_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.banner_image_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("banner_image")}>
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.bannerRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleBannerDrop()}
            >
              <div className="dz-message">Banner</div>
            </DropzoneComponent>
          )}
          {this.state.logo_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.logo_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("logo_image")}>
                  Remove file
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.logoRef}
              //llamamos a las refs
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleLogoDrop()}
            >
              <div className="dz-message">Logo</div>
            </DropzoneComponent>
          )}
        </div>
        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
      // </div>
    );
  }
}
