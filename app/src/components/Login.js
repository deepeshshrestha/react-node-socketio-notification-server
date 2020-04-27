import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    if (localStorage.getItem("notificationserver"))
      this.props.history.push("/");

    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleSumbit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/api/users/login",
      data: this.state,
    }).then((response) => {
      new Notification("Hi there!");
      localStorage.setItem("notificationserver", response.data.load.token);
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <div className="Registration">
        <h1> LOGIN </h1>
        <form onSubmit={this.handleSumbit}>
          <p> Email </p>
          <input
            type="text"
            value={this.state.email}
            name="email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <p> Password </p>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <p></p>
          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
          <p></p>
          <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }
}
