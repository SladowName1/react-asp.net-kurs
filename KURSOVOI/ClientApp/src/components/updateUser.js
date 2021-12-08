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

export class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null,
      userInfo:null,
      
    };
  }

  componentDidMount() {
      this.getUser();
  }
  updateUser(){
    var e = document.getElementById("select-id");
    let role = e.options[e.selectedIndex].text;
    let user;
    let userInfo;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    axios
    .post(
      `https://localhost:44314/record/updateUser?id=${id}&role=${role}`
    )
    .then((res) => {
      console.log(res.data);
    });
  }

  render() {
      if(this.state.user!=null){
          if(this.state.userInfo!=null){
            return(
                <div className="profile-container">
                <div className="container-to-flex">
                  <div className="photo">
                    <Image
                      cloudName="dz3dswxup"
                      publicId={this.state.userInfo.photo}
                      width="300"
                      crop="scale"
                    />
                  </div>
                  <div className="info-container">
                    <div className="login">
                      Login {this.state.user.login}
                    </div>
                    <div className="email">
                      <div className="email-title">
                        Email {this.state.userInfo.email}
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Passowrd {this.state.user.password}
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Role {this.state.user.role}
                      </div>
                    </div>
                    <select id="select-id">
                    <option>user</option>
                    <option>admin</option>
                  </select>
                  <button onClick={this.updateUser}>Update User</button>
                  </div>
                </div>
              </div>
              )
          }
          else{
            return(
                <div className="profile-container">
                <div className="container-to-flex">
                  <div className="info-container">
                    <div className="login">
                      Login {this.state.user.login}
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Passowrd {this.state.user.password}
                      </div>
                    </div>
                    <div className="password-container">
                      <div className="current-passowrd">
                        Role {this.state.user.role}
                      </div>
                    </div>
                    <select id="select-id">
                    <option>user</option>
                    <option>admin</option>
                  </select>
                  <button onClick={this.updateUser}>Update User</button>
                  </div>
                </div>
              </div>
              )
          }
          
          
      }
    return (
      <div>
        <h1>WTF</h1>
      </div>
    );
  }

  getUser(){
    axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get("id");
      axios
      .get(
        `https://localhost:44314/record/getUserForAdmin?id=${id}`
      )
      .then((res) => {
        this.setState({ user: res.data.user });
        this.setState({ userInfo: res.data.infoaboutuser });
        console.log(res.data);
      });
  }

}
