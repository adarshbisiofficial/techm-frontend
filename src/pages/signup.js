import React, { Component } from "react";
import { Button, Form, Container, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import qs from "querystring";
import _ from "lodash";

let axiosconfig = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*"
  }
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      phone: "",
      name: "",
      message: ""
    };
  }

  onChangeUserName = event => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  onChangePhone = event => {
    this.setState({ phone: event.target.value });
  };
  onChangeName = event => {
    this.setState({ name: event.target.value });
  };

  onSignup = () => {
    var credentials = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      phone: this.state.phone,
      empid: this.state.username
    };
    console.log(credentials);
    var url = "http://localhost:5000/register";
    axios.post(url, qs.stringify(credentials), axiosconfig).then(response => {
      _.has(response.data, "error")
        ? this.setState({ message: "Invalid Credentials" })
        : this.setState({ message: "Signed Up" });
    });
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <Container>
          <h3>Sign Up</h3>
          <br />
          <br />
          <Form>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="email"
                placeholder="Enter Username"
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
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                onChange={this.onChangeName}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="text"
                maxLength={10}
                placeholder="Enter your phone number"
                onChange={this.onChangePhone}
              />
            </FormGroup>
            <Button color="success" onClick={this.onSignup}>
              Sign Up
            </Button>
            <div>{this.state.message}</div>
          </Form>
          <br />
          <br />
          <a className="btn btn-primary" href="/">
            Home
          </a>{" "}
          <a className="btn btn-danger" href="/login">
            Login
          </a>
        </Container>
      </div>
    );
  }
}

export default Signup;
