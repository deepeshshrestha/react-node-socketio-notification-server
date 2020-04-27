import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { decode } from "../utils/auth";
import SocketContext from "../utils/socketio-context";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };

    if (decode(localStorage.getItem("notificationserver")).role !== "admin") {
      this.props.history.push("/");
    }
  }

  handleClick(user) {}

  handleClickForAll() {}

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:3000/api/users/allUsers",
      data: this.state,
    }).then((response) => {
      this.setState({
        userList: response.data,
      });
    });
  }

  render() {
    const { userList } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {userList.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => this.handleClick(user)}>
                      SEND NOTIFICAITON
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <p></p>
          <button onClick={() => this.handleClickForAll()}>
            SEND NOTIFICAITON TO ALL USER
          </button>
          <p></p>
          <Link to="/">
            <h3>Back</h3>
          </Link>
        </table>
      </div>
    );
  }
}

const Admin = (props) => (
  <SocketContext.Consumer>
    {(socket) => <App {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default Admin;
