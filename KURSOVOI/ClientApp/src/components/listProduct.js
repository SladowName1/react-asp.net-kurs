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
export class ListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null,
    };
  }

  componentDidMount() {
    this.getListProduct();
  }

  render() {
    if (this.state.products != null) {
      return (
        <div className="list-container">
          {this.state.products.map((product) => (
            <div key={product.id} className="list-one-product">
                
              <NavLink
                tag={Link}
                to={`/product/?id=${product.id}`}
                className="text-dark list-product-a"
              >
                <Video
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
    return (
      <div>
        <h1>List Product</h1>
      </div>
    );
  }
  getListProduct() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    axios
      .get(`https://localhost:44314/record/getProduct?id=${id}`)
      .then((res) => {
        this.setState({ products: res.data });
        console.log(this.state.products);
      });
  }
}
