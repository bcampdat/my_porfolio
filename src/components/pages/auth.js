import React, { Component } from "react";
import Login from "../auth/login";
import loginImg from "../../../static/assets/images/auth/login.jpg";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);
    this.handleUnSuccessAuth = this.handleUnSuccessAuth.bind(this);
  }

  handleSuccessAuth() {
    this.props.handleSuccessfulLogin();
    // si el user esta logeado  (consulta historial)
    this.props.history.push("/");
  }

  handleUnSuccessAuth() {
    this.props.handleUnSuccessfulLogin();
  }
  render() {
    return (
      <div className="auth-page-wrapper">
        <div
          className="left-column"
          style={{
            backgroundImage: `url(${loginImg})`,
          }}
        />

        <div className="right-column">
          <Login
            handleSuccessAuth={this.handleSuccessAuth}
            handleUnSuccessAuth={this.handleUnSuccessAuth}
          />
        </div>
      </div>
    );
  }
}
