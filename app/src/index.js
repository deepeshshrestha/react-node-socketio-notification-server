import React from "react";

import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";

import SocketContext from "./utils/socketio-context";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

import "./index.css";

function App() {
  const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("notificationserver") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );

  return (
    <Router>
      <div>
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <SocketContext.Provider value={socket}>
          <AuthenticatedRoute exact path="/" component={Home} />
          <AuthenticatedRoute path="/admin" component={Admin} />
        </SocketContext.Provider>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
