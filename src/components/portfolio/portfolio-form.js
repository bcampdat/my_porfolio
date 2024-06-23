import React, { Component } from "react";
import axios from "axios";

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
  }

  buildForm() {
    let formData = new FormData();
    // creamos el objeto para el formulario
    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

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
        console.log("response", response);
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

          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
