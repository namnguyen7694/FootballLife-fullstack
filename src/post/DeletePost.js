import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { remove } from "./apiPost";
import { isAuthenticated } from "../auth";
class DeletePost extends Component {
  state = {
    redirectToHome: false
  };

  deletePost = () => {
    const postId = this.props.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your post?");
    if (answer) {
      this.deletePost();
    }
  };
  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <button
          onClick={this.deleteConfirmed}
          className="btn btn-raised btn-danger"
        >
          Delete Post
        </button>
      </div>
    );
  }
}

export default DeletePost;
