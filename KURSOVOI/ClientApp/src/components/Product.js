import React, { Component } from "react";
import axios from "axios";
import { Cloudinary } from "cloudinary-react";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import "../style/Product.css";
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

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      like: false,
      id: null,
      name: "",
      description: "",
    };
  }
  componentDidMount() {
    this.getProduct();
    this.checkFavorite();
  }

  ClickLike = () => {
    if (this.props.account) {
      if (!this.state.like) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .post(
            `https://localhost:44314/record/insertLike?idUser=${this.props.account.login}&idProduct=${this.state.product.id}`
          )
          .then((res) => {
            console.log(res.data);
            this.setState({ product: res.data });
          });
        this.setState({ like: true });
      } else {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        axios
          .post(
            `https://localhost:44314/record/deleteLike?idUser=${this.props.account.login}&idProduct=${this.state.product.id}`
          )
          .then((res) => {
            this.setState({ product: res.data });
          });
        this.setState({ like: false });
      }
    } else {
      alert("You need registration to like video");
    }
  };

  deleteProduct =() => {
    axios
    .post(
      `https://localhost:44314/record/deleteProduct?id=${this.state.id}`
    )
    .then((res) => {
      console.log(res.data)
    });
  }
  updateProduct = () => {
    axios
      .post(
        `https://localhost:44314/record/updateProduct?id=${this.state.id}&name=${this.state.name}&description=${this.state.description}`
      )
      .then((res) => {
        this.setState({ product: res.data });
        this.setState({ name: res.data.name });
        this.setState({ description: res.data.description });
        this.setState({ id: res.data.id });
      });
  };
  render() {
    if (this.state.product != null) {
      if (!this.state.like) {
        if (this.props.account) {
          if (this.props.account.role == "admin") {
            return (
              <div className="product-container">
                <div className="product-name-like">
                  <div className="update-product" onClick={this.updateProduct}>Update</div>
                  <div className="product-name">
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="product-like-container">
                    <div onClick={this.ClickLike} className="product-like">
                      <Image
                        cloudName="dz3dswxup"
                        publicId="heart_pkf87k"
                        width="50px"
                      />
                    </div>
                    <div className="product-like-number">
                      <p>{this.state.product.numberOfLikes}</p>
                    </div>
                    <div className="delete-product" onClick={this.deleteProduct}>
                      Delete
                    </div>
                  </div>
                </div>

                <div className="product-video">
                  <Video
                    cloudName="dz3dswxup"
                    publicId={this.state.product.video}
                    loading="video Load"
                    width="100%"
                    controls={true}
                  />
                </div>
                <div className="product-description">
                  <textarea
                    type="text"
                    value={this.state.description}
                    onChange={(e) =>
                      this.setState({ description: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
            );
          }
        }
        return (
          <div className="product-container">
            <div className="product-name-like">
              <div className="product-name">{this.state.product.name}</div>
              <div className="product-like-container">
                <div onClick={this.ClickLike} className="product-like">
                  <Image
                    cloudName="dz3dswxup"
                    publicId="heart_pkf87k"
                    width="50px"
                  />
                </div>
                <div className="product-like-number">
                  <p>{this.state.product.numberOfLikes}</p>
                </div>
              </div>
            </div>

            <div className="product-video">
              <Video
                cloudName="dz3dswxup"
                publicId={this.state.product.video}
                loading="video Load"
                width="100%"
                controls={true}
              />
            </div>
            <div className="product-description">
              {this.state.product.description}
            </div>
          </div>
        );
      } else {
        return (
          <div className="product-container">
            <div className="product-name-like">
              <div className="product-name">{this.state.product.name}</div>

              <div className="product-like-container">
                <div onClick={this.ClickLike} className="product-like">
                  <Image
                    cloudName="dz3dswxup"
                    publicId="heart_1_lli1zr"
                    width="50px"
                  />
                </div>
                <div className="product-like-number">
                  <p>{this.state.product.numberOfLikes}</p>
                </div>
              </div>
            </div>
            <div className="product-video">
              <Video
                cloudName="dz3dswxup"
                publicId={this.state.product.video}
                loading="video Load"
                width="100%"
                controls={true}
              />
            </div>
            <div className="product-description">
              {this.state.product.description}
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        <h1 id="tabelLabel"></h1>
        <button onClick={this.clickS}>Click to check groups</button>
        <p>qwe.</p>
      </div>
    );
  }

  getProduct = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    axios
      .get(`https://localhost:44314/record/getOneProduct?id=${id}`)
      .then((res) => {
        this.setState({ product: res.data });
        this.setState({ name: res.data.name });
        this.setState({ description: res.data.description });
        this.setState({ id: res.data.id });
      });
  };

  checkFavorite = () => {
    if (this.props.account) {
      const queryParams = new URLSearchParams(window.location.search);
      const id = queryParams.get("id");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      axios
        .get(
          `https://localhost:44314/record/checkFavorite?id=${this.props.account.id}&idProduct=${id}`
        )
        .then((res) => {
          this.setState({ like: res.data.like });
        });
    }
  };
}
