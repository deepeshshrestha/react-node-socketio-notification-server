import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Home from "./components/Home";

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
        <AuthenticatedRoute exact path="/" component={Home} />
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
