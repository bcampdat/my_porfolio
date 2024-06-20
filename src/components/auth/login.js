import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      // EMAIL & PASSWORD
      // evitamos el uso tradicional de condicional
      [event.target.name]: event.target.value,
      errorText: "",
    });
  }

  handleSubmit(event) {
    // console.log("Handle submit", event);
    // nos sirven como debugg
    // console.log("Handle submit", this.state.email, this.state.password);
    // post ( arg1: url, arg2: objeto, arg3: config )
    axios
      .post(
        "https://api.devcamp.space/sessions",

        {
          client: {
            // creamos un objeto cliente que tiene email y password
            email: this.state.email,
            password: this.state.password,
          },
        },
        // cookies para la autenticacion
        { withCredentials: true }
      )
      .then((response) => {
        // console.log("response", response);
        if (response.data.status === "created") {
          // console.log("You can come in...");
          this.props.handleSuccessAuth();
        } else {
          this.setState({
            errorText: "Wrong email or password",
          });
          this.props.handleUnSuccessAuth();
        }
      })
      .catch((error) => {
        // console.log("some error occurred", error);
        this.setState({
          errorText: "An error occurred",
        });
        console.log(error);
        this.props.handleUnSuccessAuth();
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD </h1>
        {/* <h2>{this.state.email} </h2>
        para ver el funcionamiento del estado y los eventos
        <h2>{this.state.password} </h2> */}

        <h2>{this.state.errorText} </h2>
        {/* captura errores */}

        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        {/* <h1>Form should go here</h1>
        <div>button</div */}
      </div>
    );
  }
}
