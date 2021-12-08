import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login: "",
      Password: "",
      checkedRegistration: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  LoginToApp = () => {
    axios
      .post(
        `https://localhost:44314/account/login?Login=${this.state.Login}&password=${this.state.Password}`
      )
      .then(
        (response) => {
          console.log(response.data);
          localStorage.setItem('token',response.data.token);
          this.setState({ checkedRegistration: true });
          this.props.setAccount(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    const { Login, Password } = this.state;
    if (this.state.checkedRegistration) {
      return <Redirect to={"/"} />;
    }
    return (
      <Container className="App">
        <h4 className="PageHeading">Login</h4>
        <Form className="form">
          <Col>
            <FormGroup row>
              <Label for="name" sm={2}>
                Login
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="Login"
                  onChange={this.handleChange}
                  value={Login}
                  placeholder="Enter Login"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="address" sm={2}>
                Passowrd
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="Password"
                  onChange={this.handleChange}
                  value={Password}
                  placeholder="Enter Passowrd"
                />
              </Col>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup row>
              <Col sm={2}></Col>
              <Col sm={3}>
                <button
                  type="button"
                  onClick={this.LoginToApp}
                  className="btn btn-success"
                >
                  Submit
                </button>
              </Col>
              <Col sm={1}>
                <Button color="danger">Cancel</Button>{" "}
              </Col>
              <Col sm={5}></Col>
            </FormGroup>
          </Col>
        </Form>
      </Container>
    );
  }
}
