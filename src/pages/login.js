import React, { Component } from "react";
import _ from "lodash";
import { Button, Form, Container, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import "./login.css";
import {Helmet} from 'react-helmet';

let axiosconfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*"
  }
};

class Login extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "", message: "" };
  }

  onChangeUserName = event => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onlogin = () => {
    var credentials = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(credentials);
    var url = "https://techm-proj.herokuapp.com/login";
    axios.post(url, qs.stringify(credentials), axiosconfig).then(response => {
      console.log(response.data);
      _.has(response.data, "error")
        ? this.setState({ message: "Invalid Credentials" })
        : window.localStorage.setItem("token", response.data.token);
      this.setState({ message: "Logged In" });
    });
  };

  render() {
    return (
      <div className="login">
      <Helmet>
        <style>{'body { background-color: #192A56; }'}</style>
      </Helmet>
        <br />
        <br />
        <Container>
          <h2 className="head">Login</h2>
          <br />
          <br />
          <Form>
            <FormGroup>
              <Label className="head">UserID</Label>
              <Input
                type="email"
                className="input-line"
                placeholder="Enter your ID"
                onChange={this.onChangeUserName}
              />
            </FormGroup>
            <FormGroup>
              <Label className="head">Password</Label>
              <Input
                type="password"
                placeholder="Enter the Password"
                className="input-line"
                onChange={this.onChangePassword}
              />
            </FormGroup>
            <Button color="success" onClick={this.onlogin}>
              Login
            </Button>
            <div className="head">{this.state.message}</div>
          </Form>
          <br />
          <br />
          <a className="btn btn-primary" href="/">
            Home
          </a>{" "}
          <a className="btn btn-danger" href="/signup">
            Signup
          </a>
        </Container>
      </div>
    );
  }
}

export default Login;
