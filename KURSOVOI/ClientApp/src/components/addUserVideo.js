import React, { Component } from "react";
import axios from "axios";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import Dropzone from "react-dropzone";
import "../style/addVideo.css";
export class AddUserVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: null,
      video: "",
      nameVideo: "",
      descriptionVideo: "",
    };
  }

  componentDidMount() {
    this.getUserVideo();
  }

  sendVideo = () => {
    var e = document.getElementById("select-id");
    let type = e.options[e.selectedIndex].text;
    if (this.state.nameVideo == "" || this.state.descriptionVideo == "") {
      alert("pls Enter info at all input");
    } else {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      axios
        .post(
          `https://localhost:44314/record/insertVideo?name=${this.state.nameVideo}&description=${this.state.descriptionVideo}&video=${this.state.video}&type=${type}`
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  render() {
      if(this.state.video!=""){
          return(
            <div className="my-container">
            <form></form>
            <div>
              <Video
                cloudName="dz3dswxup"
                publicId={this.state.video}
                loading="video Load"
                width="100%"
                controls={true}
              />
            </div>
            <div className="type">
              <div className="type-title">Type of tricks</div>
              <div className="type-value">
                <select id="select-id">
                  {this.state.groups.map((group) => (
                    <option key={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="name">
              <div className="name-title">Name:</div>
              <div className="name-value">
                <input
                  required
                  type="text"
                  value={this.state.nameVideo}
                  onChange={(e) => this.setState({ nameVideo: e.target.value })}
                />
              </div>
            </div>
            <div className="description">
              <div className="description-title">Descriptio:</div>
              <div className="description-valu">
                <textarea
                  required
                  value={this.state.descriptionVideo}
                  onChange={(e) =>
                    this.setState({ descriptionVideo: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <button onClick={this.sendVideo}>Add Video</button>
          </div>
          )
      }
   return(
       <div>
           <h1>WTF</h1>
       </div>
   )
  }

  getUserVideo = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    axios.get(`https://localhost:44314/record/getUserVideoForAdmin?id=${id}`).then((res) => {
      this.setState({ video: res.data.video });
    });
    axios.get("https://localhost:44314/record/getgroups").then((res) => {
        this.setState({ groups: res.data });
      });
  };
}
