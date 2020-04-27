import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    };

    if (localStorage.getItem("notificationserver")) {
      this.props.history.push("/");
    }

    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleSumbit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/api/users/register",
      data: this.state,
    })
      .then(() => {
        new Notification("Account Registered", {
          body: "Please login to continue",
        });
        this.props.history.push("/login");
      })
      .catch((err) => {
        alert(err.response.data.load.error);
      });
  }

  render() {
    return (
      <div className="Registration">
        <h1> REGISTRATION </h1>

        <form onSubmit={this.handleSumbit}>
          <p> Name </p>
          <input
            required
            type="text"
            value={this.state.name}
            name="name"
            placeholder="name"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <p> Email </p>
          <input
            required
            type="email"
            value={this.state.email}
            name="email"
            placeholder="email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <p> Role </p>
          <select
            required
            name="role"
            onChange={(e) => {
              this.setState({ role: e.target.value });
            }}
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <p> Password </p>
          <input
            required
            type="password"
            value={this.state.password}
            name="password"
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <p> Confirm Password </p>
          <input
            required
            type="password"
            value={this.state.confirmPassword}
            name="confirmPassword"
            onChange={(e) => {
              this.setState({ confirmPassword: e.target.value });
            }}
          />
          <p></p>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
          <p></p>
          <Link to="/login">Login</Link>
        </form>
      </div>
    );
  }
}
