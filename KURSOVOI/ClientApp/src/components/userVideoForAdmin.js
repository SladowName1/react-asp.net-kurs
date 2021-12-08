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

export class UserVideoForAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      idUserVideo:null
    };
  }

  componentDidMount() {
    if (this.props.account) {
      this.getUserVideo();
    }
  }

  deleteVideo = (id) =>{
    axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    axios
    .post(
      `https://localhost:44314/record/cancelVideo?id=${id}`
    )
    .then((res) => {
      this.setState({ video: res.data });
      console.log(res.data);
    });
  }

  addVideo = (id) =>{
      this.setState({idUserVideo:id});
  }

  render() {
      if(this.state.idUserVideo!=null){
          return(<Redirect to={`/addUserVideo/?id=${this.state.idUserVideo}`}/>)
      }
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
                  <button onClick={() => this.addVideo(product.id)}>Accept</button>
                  <button onClick={() => this.deleteVideo(product.id)}>Cancel</button>
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
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    axios
      .get(
        `https://localhost:44314/record/getUserVideo?id=${id}`
      )
      .then((res) => {
        this.setState({ video: res.data });
        console.log(res.data);
      });
  };
}
