import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { UserList } from "./components/userList";
import { Counter } from "./components/Counter";
import { QWE } from "./components/qwe";
import { AddUsers } from "./components/addUsers";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { AddVideos } from "./components/addVideo";
import { ListProduct } from "./components/listProduct";
import { Product } from "./components/Product";
import { Favorite } from "./components/Favorite";
import { AllProduct } from "./components/allProduct";
import { UpdateProduct } from "./components/updateProduct";
import { UserVideo } from "./components/userVideo";
import { UserVideoForAdmin } from "./components/userVideoForAdmin";
import { AddUserVideo } from "./components/addUserVideo";
import { UpdateUser } from "./components/updateUser";
import axios from "axios";

import "./custom.css";

export default class App extends Component {
  state = {};
  componentDidMount = () => {
    axios.get("/getacc").then(
      (res) => {
        this.setAccount(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  setAccount = (account) => {
    this.setState({ account: account });
  };

  render() {
    return (
      <Layout account={this.state.account} setAccount={this.setAccount}>
        <Route
          exact
          path="/"
          component={() => (
            <Home account={this.state.account} setAccount={this.setAccount} />
          )}
        />
        <Route path="/counter" component={Counter} />
        <Route
          path="/userList"
          component={() => (
            <UserList
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/qwe"
          component={() => <QWE account={this.state.account} />}
        />
        <Route
          path="/addUsers"
          component={() => (
            <AddUsers
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/login"
          component={() => (
            <Login account={this.state.account} setAccount={this.setAccount} />
          )}
        />
        <Route
          path="/profile"
          component={() => (
            <Profile
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/addVideo"
          component={() => (
            <AddVideos
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/listProduct"
          component={() => (
            <ListProduct
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />

        <Route
          path="/product"
          component={() => (
            <Product
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/favorite"
          component={() => (
            <Favorite
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/allProduct"
          component={() => (
            <AllProduct
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/updateProduct"
          component={() => (
            <UpdateProduct
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/userVideo"
          component={() => (
            <UserVideo
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/userVideoForAdmin"
          component={() => (
            <UserVideoForAdmin
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/addUserVideo"
          component={() => (
            <AddUserVideo
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
        <Route
          path="/updateUser"
          component={() => (
            <UpdateUser
              account={this.state.account}
              setAccount={this.setAccount}
            />
          )}
        />
      </Layout>
    );
  }
}
