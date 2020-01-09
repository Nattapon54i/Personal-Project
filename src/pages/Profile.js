import React, { Component } from "react";
import Axios from "../config/axios.setup";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";

export class Profile extends Component {
  state = {
    isAdmin: false,
    userId: '',
  };

  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    console.log("token", token);

    if (token) {
      let userInfo = jwtDecode(token);
      console.log(userInfo);
      this.setState({
        isAdmin: userInfo.role === "admin" ? true : false,
        userId: userInfo.id
      });
    }

    Axios.get("/users")
      .then(result => {
        console.log(result.data)
      })
      .catch(err => {
        console.error(err);
      });
  };


  render() {
    return (
      <div className="container-btn-upload">
        {this.state.isAdmin ? (
          <Link to="/uploadproduct">
            <button className="btn-upload">อัพโหลดสินค้า</button>
          </Link>
        ) : (
            <div></div>
          )}
      </div>
    );


    // return (
    //   <div className="container-btn-upload">
    //     <Link to="/uploadproduct">
    //       <button className="btn-upload">อัพโหลดสินค้า</button>
    //     </Link>
    //     <div></div>
    //   </div>
    // );


  }
}

export default Profile;
