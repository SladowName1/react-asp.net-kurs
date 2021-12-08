import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { thisTypeAnnotation } from "@babel/types";

export class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [], 
      loading: true,
    userIdForVideo:null,
  userId:null };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  updateUser (id)  {
    this.setState({userId:id})
  };

  checkVideoUser = (id) => {
    console.log(id)
    this.setState({userIdForVideo:id})
  };


  render() {
    if(this.state.userIdForVideo!=null){
      return(<Redirect to={`/userVideoForAdmin/?id=${this.state.userIdForVideo}`} />)
      
    }
    if(this.state.userId!=null){
      return(<Redirect to={`/updateUser/?id=${this.state.userId}`} />)
    }
    if(this.state.users){
      return(
        <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>User Login</th>
            <th>Update</th>
            <th>See User Video</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((forecast) => (
            <tr key={forecast.id}>
              <td>{forecast.login}</td>
              <td>
                <button onClick={() => this.updateUser(forecast.id)}>
                Update
                </button>
              </td>
              <td>
              <button onClick={() => this.checkVideoUser(forecast.idUser)}>
                See Video
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )
    }

    return (
      <div>
        <h1>xd</h1>
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch("record");
    const data = await response.json();
    console.log(data);
    this.setState({ users: data, loading: false });
  }
}
