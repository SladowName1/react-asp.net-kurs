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
import "../style/userVideo.css";
import Dropzone from "react-dropzone";

export class UserVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
    };
  }

  componentDidMount() {
    if (this.props.account) {
      this.getUserVideo();
    }
  }

  render() {
    if (this.props.account) {
      if (this.state.video != null) {
        if (this.state.video.video != "no") {
          return (
            <div className="container-video">
              <div className="my-container">
                {this.state.video.map((product) => (
                  <div key={product.id} className="user-video-in-page">
                   <Video
                    cloudName="dz3dswxup"
                    publicId={product.video}
                    loading="video Load"
                    width="100%"
                    controls={true}
                  />
                  <div>{product.verification}</div>
                  </div>
                ))}
                
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <h1>You dont have video</h1>
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

  getUserVideo = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    
    axios
      .get(
        `https://localhost:44314/record/getUserVideo?id=${this.props.account.id}`
      )
      .then((res) => {
        this.setState({ video: res.data });
        console.log(res.data);
      });
  };
}
