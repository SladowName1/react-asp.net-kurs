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
export class AllProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allProducts: null,
    };
  }

  componentDidMount() {
    this.getListProduct();
  }

  render() {
    if (this.state.allProducts != null) {
      const queryParams = new URLSearchParams(window.location.search);
      const s = queryParams.get("s");
      let products = [];
      for (let i = 0; i < this.state.allProducts.length; i++) {
        if (this.state.allProducts[i].name.toLowerCase().includes(s)) {
          products.push(this.state.allProducts[i]);
        }
      }
      if (products.length != 0) {
        return (
          <div className="list-container">
            {products.map((product) => (
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
      } else {
        return (
          <div>
            <h1>No result for your search</h1>
          </div>
        );
      }
    }
    return (
      <div>
        <h1>xD</h1>
      </div>
    );
  }
  getListProduct() {
    axios.get(`https://localhost:44314/record/getAllProduct`).then((res) => {
      this.setState({ allProducts: res.data });
      console.log(this.state.allProducts);
    });
  }
}
