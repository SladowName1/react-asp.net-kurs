import React, { Component } from 'react';
import "../style/dropzone.css";
import axios from "axios";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      groups: null,
    };
  }
  componentDidMount() {
    this.getGroups();
  }
  render() {
    if (this.state.groups != null) {
      return (
        <div>
          <div className="image-container">
          
            {this.state.groups.map((forecast) => (
              <div key={forecast.id} className="image">
                <NavLink tag={Link} to={`/listProduct/?id=${forecast.id}`} className="text-dark">
                <div className="image-photo">
                  <Image
                  className="image-value"
                    cloudName="dz3dswxup"
                    publicId={forecast.photo}
                    crop="scale"
                  /><br/>
                </div>
                <div className="image-name">
                {forecast.name}
                </div>
                </NavLink>
              </div>
            ))}
            
          </div>
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

  getGroups = () => {
    axios.get("https://localhost:44314/record/getgroups").then((res) => {
      this.setState({ groups: res.data });
    });
  };
}
