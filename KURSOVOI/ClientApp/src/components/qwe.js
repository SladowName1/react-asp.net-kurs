import React, { Component } from "react";
import axios from "axios";
import { Cloudinary } from "cloudinary-react";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import Dropzone from "react-dropzone";
import "../style/dropzone.css";

export class QWE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
    };
  }
  clickButton() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios.get(`https://localhost:44314/account/zxc`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  componentDidMount() {
    this.clickS();
  }

  render() {
    if (this.state.groups != null) {
      return (
        <div>
        </div>
      );
    }
    return (
      <div>
        <h1 id="tabelLabel"></h1>
        <button onClick={this.clickS}>Click to check groups</button>
        <p>qwe.</p>
      </div>
    );
  }

  clickS = () => {
    axios.get("https://localhost:44314/record/getgroups").then((res) => {
      this.setState({ groups: res.data });
    });
  };
}
