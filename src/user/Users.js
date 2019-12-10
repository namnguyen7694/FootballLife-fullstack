import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = users => (
    <div className="row">
      {users.map((user, i) => (
        <div className="card-body col-md-6" key={i}>
          <div className="row">
            <img
              style={{ height: "200px", width: "auto", objectFit: "cover" }}
              className="img-thumbnail col-md-6"
              src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
            />
            <div className="col-md-6">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
                to={`/user/${user._id}`}
                className="btn btn-raised btn-primary btn-sm"
              >
                View Profile
              </Link>

              {window.location.pathname === "/admin" && (
                <>
                  <Link
                    className="btn btn-raised btn-success"
                    to={`/user/edit/${user._id}`}
                  >
                    Edit Profile
                  </Link>
                  <DeleteUser userId={user._id} />
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
