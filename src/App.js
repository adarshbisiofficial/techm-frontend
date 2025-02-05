import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Helmet} from 'react-helmet';

//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <div className="App">
    <Helmet>
      <style>{'body { background-color: #DAE0E2; }'}</style>
    </Helmet>
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
