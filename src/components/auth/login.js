import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD </h1>
        <form>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
        </form>
        {/* <h1>Form should go here</h1>
        <div>button</div */}
      </div>
    );
  }
}
