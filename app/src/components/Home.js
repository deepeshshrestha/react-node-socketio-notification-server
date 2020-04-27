import React, { Component } from "react";
import { Link } from "react-router-dom";
import { decode } from "../utils/auth";
import SocketContext from "../utils/socketio-context";
import * as uuid from "uuid/v4";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: decode(localStorage.getItem("notificationserver")),
    };
  }

  componentDidMount() {
    this.props.socket.emit(
      "registerUserToNotificationService",
      this.state.user.email,
      uuid()
    );

    this.props.socket.on("notifications", (title, body) => {
      this.notifyUser({ title, body });
    });
  }

  notifyUser(data) {
    console.log({ data });
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
      new Notification(data.title, {
        body: data.body,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          new Notification(data.title, {
            body: data.body,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="Home">
        <p>This page can be accessed by any authenticated user</p>
        <p>Only admins can access the below page</p>
        <p></p>
        <Link to="/admin">Notification Control Panel</Link>
        <h4
          onClick={() => {
            localStorage.removeItem("notificationserver");
            window.location.reload();
          }}
        >
          LOGOUT
        </h4>
      </div>
    );
  }
}

const Home = (props) => (
  <SocketContext.Consumer>
    {(socket) => <App {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default Home;
