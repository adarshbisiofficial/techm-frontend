import React, { Component } from "react";
import { Table, Spinner } from "reactstrap";
import Axios from "axios";
let url = "http://localhost:5000/staff";
let axiosconfig = {};

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: null, loading: true };
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      axiosconfig = {
        headers: {
          Authorization: "JWT " + token
        }
      };
    }

    Axios.get(url, axiosconfig)
      .then(response => {
        const { data } = response;
        this.setState({ tasks: data, loading: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { tasks, loading } = this.state;
    return (
      <div>
        <br/><br/>
        <h3>Tasks</h3>
        <br/><br/>
        <Table>
          <thead>
            <th>CIF</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Email</th>
          </thead>
          {loading ? (
            <Spinner />
          ) : (
            <tbody>
              {tasks.map(row => {
                return (
                  <tr>
                    <td>{row.CIF}</td>
                    <td>{row.firstname}</td>
                    <td>{row.lastname}</td>
                    <td>{row.phoneNumber}</td>
                    <td>{row.address1}</td>
                    <td>{row.address2}</td>
                    <td>{row.email}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </Table>
      </div>
    );
  }
}

export default Staff;
