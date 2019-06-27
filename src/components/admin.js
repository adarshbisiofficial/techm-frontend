import React, { Component } from "react";
import Axios from "axios";
import { Spinner, Table, Button } from "reactstrap";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

let url = "http://localhost:5000/admin/docs/";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { docs: null, valid: null, tasksP: false, tasks: null };
  }

  componentDidMount() {
    Axios.get(url)
      .then(response => {
        this.setState({ docs: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  showTasks = event => {
    Axios.get(url + event.target.name)
      .then(response => {
        this.setState({ tasks: response.data, tasksP: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  switchBack = () => {
    this.setState({ tasksP: false });
  };

  render() {
    const { docs, tasksP, tasks } = this.state;
    return (
      <div>
        <br />
        <h3>Admin</h3>
        <br />
        <br />
        <FilePond name="avatar" server="http://localhost:5000/validate" />
        {tasksP ? (
          <>
            <Button color="info" onClick={this.switchBack}>
              Go Back
            </Button>
            <br />
            <br />
            <Table>
              <thead>
                <th>Sales ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone No.</th>
                <th>CIF</th>
                <th>Address 1</th>
                <th>Address 2</th>
                <th>Email</th>
              </thead>
              <tbody>
                {tasks ? (
                  tasks.map(row => {
                    return (
                      <tr>
                        <td>{row.salesID}</td>
                        <td>{row.firstname}</td>
                        <td>{row.lastname}</td>
                        <td>{row.phoneNumber}</td>
                        <td>{row.CIF}</td>
                        <td>{row.address1}</td>
                        <td>{row.address2}</td>
                        <td>{row.email}</td>
                      </tr>
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Document ID</th>
                <th>Date Modified</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {docs ? (
                docs.map(row => {
                  return (
                    <tr>
                      <td>{row.name}</td>
                      <td>{row.datemod.slice(0, 10)}</td>
                      <td>
                        <Button name={row.name} onClick={this.showTasks}>
                          {row.name}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Spinner />
              )}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

export default Admin;
