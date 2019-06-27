import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import _ from "lodash";
import Axios from "axios";
import Admin from "../components/admin";
import Staff from "../components/staff";
import "./home.css";
import {Jumbotron} from 'react-bootstrap';
//import {Image,Col,Row} from 'react-bootstrap';
import {logo} from "../logo-resize.png";

let axiosconfig = {};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "", loggedin: false };
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      axiosconfig = {
        headers: {
          Authorization: "JWT " + token
        }
      };

      let url = "https://techm-proj.herokuapp.com/current";

      Axios.get(url, axiosconfig).then(response => {
        const { data } = response;
        const isadmin = _.has(data, "isAdmin");
        if (isadmin) this.setState({ user: "admin", loggedin: true });
        else this.setState({ user: "staff", loggedin: true });
      });
    }
  }

  onlogout = () => {
    window.localStorage.removeItem("token");
    this.setState({ loggedin: false });
  };

  render() {
    const { user, loggedin } = this.state;
    return (
      <div className="home">
        <Container>
          <br />
          <h2>ScotiaBank</h2>
          <br />
          <Jumbotron>
              <h1>Welcome to Scotiabank.</h1>
              <p>We offer personal and commercial banking, wealth management and private banking, corporate and investment banking,<br/> and capital markets, through our global team of approximately 90,000 Scotiabankers.</p>
          </Jumbotron>
          {loggedin ? (
            <div>
              <Button color="danger" onClick={this.onlogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <a className="btn btn-success" href="/login">
                Login
              </a>{" "}
              <a className="btn btn-warning" href="/signup">
                Signup
              </a>
            </div>
          )}
          {loggedin ? (
            <div>{user === "admin" ? <Admin /> : <Staff />}</div>
          ) : null}
        </Container>
        <img src={logo} alt="logo"/>
      </div>
    );
  }
}

export default Home;
