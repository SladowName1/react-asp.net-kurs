import React, { Component } from "react";
import axios from "axios";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { Redirect } from "react-router-dom";
import "../style/Profile.css";
import "../style/groupsStyle.css";
import Dropzone from "react-dropzone";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageLoad: null,
      groups: null,
      nameVideo: "",
      descriptionVideo: "",
    };
  }

  componentDidMount() {
    if (this.props.account) {
      if (this.props.account.email != "null") {
        this.state.email = this.props.account.email;
      }

      if (this.props.account.url != "null") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .get(
            `https://localhost:44314/account/getPhoto?login=${this.props.account.login}`
          )
          .then((res) => {
            this.setState({ imageLoad: res.data });
          });
      }
    }
  }

  sendEmail = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios
      .post(
        `https://localhost:44314/account/insertEmail?login=${this.props.account.login}&email=${this.state.email}`
      )
      .then((res) => {
        console.log(res);
        this.props.setAccount(res.data);
      });
  };
  onDrop = (acceptedFiles) => {
    delete axios.defaults.headers.common["Authorization"];
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "ms04yetu");

    axios
      .post("https://api.cloudinary.com/v1_1/dz3dswxup/image/upload", formData)
      .then((res) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .post(
            `https://localhost:44314/account/insertPhoto?urlPhoto=${res.data.public_id}&login=${this.props.account.login}`
          )
          .then((res) => {
            axios
              .get(
                `https://localhost:44314/account/getPhoto?login=${res.data.login}`
              )
              .then((res) => {
                console.log(res.data);
                this.props.setAccount(res.data);
              });
          });
      });
  };

  addMyVideo = (acceptedFiles) => {
    delete axios.defaults.headers.common["Authorization"];
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "jtigrsss");

    axios
      .post("https://api.cloudinary.com/v1_1/dz3dswxup/video/upload", formData)
      .then((res) => {
        console.log(res.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .post(
            `https://localhost:44314/record/insertUserVideo?id=${this.props.account.id}&url=${res.data.public_id}`
          )
          .then((res) => {
            alert(res.data.res);
          });
      });
  };
  render() {
      if (this.props.account) {
        if (this.props.account.url != "null") {
          if (this.props.account.email != "null") {
            return (
              <div className="profile-container">
                <div className="container-to-flex">
                  <div className="photo">
                    <Image
                      cloudName="dz3dswxup"
                      publicId={this.props.account.url}
                      width="300"
                      crop="scale"
                    />
                  </div>
                  <div className="info-container">
                    <div className="login">
                      Login {this.props.account.login}
                    </div>
                    <div className="email">
                      <div className="email-title">
                        Email {this.props.account.email}
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Passowrd {this.props.account.password}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Dropzone onDrop={this.addMyVideo}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {isDragActive
                          ? "Drop it like it's hot!"
                          : "Add your video click or drop on this area!"}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            );
          } else {
            return (
              <div className="profile-container">
                <div className="container-to-flex">
                  <div className="photo">
                    <Image
                      cloudName="dz3dswxup"
                      publicId={this.props.account.url}
                      width="300"
                      crop="scale"
                    />
                  </div>
                  <div className="info-container">
                    <div className="login">
                      Login {this.props.account.login}
                    </div>
                    <div className="email">
                      <div className="email-title">Email</div>
                      <div className="email-value">
                        <input
                          type="email"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </div>
                      <div className="sendEmail">
                        <button onClick={this.sendEmail}> send Email</button>
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Passowrd {this.props.account.password}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Dropzone onDrop={this.addMyVideo}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {isDragActive
                          ? "Drop it like it's hot!"
                          : "Add your video click or drop on this area!"}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            );
          }
        } else {
          if (this.props.account.email != "null") {
            return (
              <div className="profile-container">
                <div className="container-to-flex">
                  <div className="photo">
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          {isDragActive
                            ? "Drop it like it's hot!"
                            : "Click me or drag a file to upload!"}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <div className="info-container">
                    <div className="login">
                      Login {this.props.account.login}
                    </div>
                    <div className="email">
                      <div className="email-title">
                        Email {this.props.account.email}
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Passowrd {this.props.account.password}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Dropzone onDrop={this.addMyVideo}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {isDragActive
                          ? "Drop it like it's hot!"
                          : "Add your video click or drop on this area!"}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            );
          } else {
            return (
              <div className="profile-container">
                <div className="container-to-flex">
                  <div className="photo">
                    <Dropzone onDrop={this.onDrop}>
                      {({ getRootProps, getInputProps, isDragActive }) => (
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          {isDragActive
                            ? "Drop it like it's hot!"
                            : "Click me or drag a file to upload!"}
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <div className="info-container">
                    <div className="login">
                      Login {this.props.account.login}
                    </div>
                    <div className="email">
                      <div className="email-title">Email</div>
                      <div className="email-value">
                        <input
                          type="email"
                          value={this.state.email}
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </div>
                      <div className="sendEmail">
                        <button onClick={this.sendEmail}> send Email</button>
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Passowrd {this.props.account.password}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Dropzone onDrop={this.addMyVideo}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        {isDragActive
                          ? "Drop it like it's hot!"
                          : "Add your video click or drop on this area!"}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </div>
            );
          }
        }
      }
    return (
      <div>
        <h1>WTF</h1>
      </div>
    );
  }

}
