import React, { Component } from "react";
import _ from "lodash";
import { Button, Form, Container, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import{logo} from "../logo.png";
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
    var url = "http://localhost:5000/login";
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
      <div>
      <img src={logo} alt ="scotiabank"/>
        <br />
        <br />
        <Container>
          <h3>Login</h3>
          <br />
          <br />
          <Form>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                placeholder="Enter username"
                onChange={this.onChangeUserName}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </FormGroup>
            <Button color="success" onClick={this.onlogin}>
              Login
            </Button>
            <div>{this.state.message}</div>
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
