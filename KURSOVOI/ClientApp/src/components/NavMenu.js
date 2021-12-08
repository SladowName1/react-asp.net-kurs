import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import { Redirect } from "react-router-dom";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      auth: false,
      search: "",
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logOut = () => {
    localStorage.clear();
    this.props.setAccount(null);
  };

  render() {
    if (this.props.account) {
      if (this.props.account.role == "admin") {
        return (
          <header>
            <Navbar
              className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
              light
            >
              <Container>
                <NavbarBrand tag={Link} to="/">
                  JClades
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse
                  className="d-sm-inline-flex flex-sm-row-reverse"
                  isOpen={!this.state.collapsed}
                  navbar
                >
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <Image
                        cloudName="dz3dswxup"
                        publicId="loupe_ph1y92"
                        width="23px"
                      />
                      <input
                        value={this.state.search}
                        onChange={(e) =>
                          this.setState({ search: e.target.value })
                        }
                        className="search-input"
                      />
                    </NavItem>
                    <Redirect to={`/allProduct/?s=${this.state.search}`} />
                    <Redirect to='/' />
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/">
                        Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/userList">
                        User List
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/addVideo">
                        Add Video
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/"
                        onClick={this.logOut}
                      >
                        Log Out
                      </NavLink>
                    </NavItem>
                  </ul>
                </Collapse>
              </Container>
            </Navbar>
          </header>
        );
      } else {
        return (
          <header>
            <Navbar
              className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
              light
            >
              <Container>
                <NavbarBrand tag={Link} to="/">
                  JClades
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse
                  className="d-sm-inline-flex flex-sm-row-reverse"
                  isOpen={!this.state.collapsed}
                  navbar
                >
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <Image
                        cloudName="dz3dswxup"
                        publicId="loupe_ph1y92"
                        width="23px"
                      />
                      <input
                        value={this.state.search}
                        onChange={(e) =>
                          this.setState({ search: e.target.value })
                        }
                        className="search-input"
                      />
                    </NavItem>
                    <Redirect to={`/allProduct/?s=${this.state.search}`} />
                    <Redirect to='/' />
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/">
                        Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/favorite">
                        Favorite
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/userVideo">
                        My Video
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/profile">
                        Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        tag={Link}
                        className="text-dark"
                        to="/"
                        onClick={this.logOut}
                      >
                        Log Out
                      </NavLink>
                    </NavItem>
                  </ul>
                </Collapse>
              </Container>
            </Navbar>
          </header>
        );
      }
    }
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              JClades
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
             
                <NavItem>
                  <Image
                    cloudName="dz3dswxup"
                    publicId="loupe_ph1y92"
                    width="23px"
                  />
                  <input
                    value={this.state.search}
                    onChange={(e) => this.setState({ search: e.target.value })}
                    className="search-input"
                  />
                </NavItem>
                <Redirect to={`/allProduct/?s=${this.state.search}`} />
                <Redirect to='/' />
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">
                    Sign In
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/addUsers">
                    Sign Up
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
