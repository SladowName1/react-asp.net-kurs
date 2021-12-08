import React, { Component } from "react";
import axios from "axios";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import '../style/listProduct.css'
export class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: null,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }
  render() {
    if (this.props.account) {
      if (this.state.favorite != null) {
        return (
          <div className="list-container">
            {this.state.favorite.map((product) => (
              <div key={product.id} className="list-one-product">
                <NavLink
                  tag={Link}
                  to={`/product/?id=${product.id}`}
                  className="text-dark list-product-a"
                ><Video
                cloudName="dz3dswxup"
                publicId={product.video}
                loading="video Load"
                width="100%"
                controls={true}
              >
              <Transformation effect="preview" />
              </Video>
                  <p>{product.name}</p>
                  <p>{product.description}</p>
                </NavLink>
              </div>
            ))}
          </div>
        );
      }
    }
    return (
      <div>
        <h1>List Product</h1>
      </div>
    );
  }
  getFavorite() {
    if (this.props.account) {
      axios
        .get(
          `https://localhost:44314/record/getFavorite?id=${this.props.account.id}`
        )
        .then((res) => {
          if (res.data.length == 0) {
            this.setState({ favorite: null });
          } else {
            this.setState({ favorite: res.data });
          }
        });
    }
  }
}
