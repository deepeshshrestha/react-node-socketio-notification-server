import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./index.css";
import Registration from "./components/Registration";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={Registration} />
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
