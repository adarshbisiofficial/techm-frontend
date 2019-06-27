import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Stylesheet from "./components/stylesheet";

function App() {
  return (
    <div className="App">
    <Stylesheet/>
      <Container />
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Router>
    </div>
  );
}

export default App;
