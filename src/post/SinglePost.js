import React, { Component } from "react";
import { like, unlike, singlePost } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import DefaultProfile from "../images/avatar.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import Skeleton from "react-loading-skeleton";

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      redirectToHome: false,
      redirectToSignin: false,
      like: false,
      likes: "",
      comments: []
    };
  }

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };
  async componentDidMount() {
    const post = await singlePost(this.props.postId)
    await this.setState({
      post: post,
      like: this.checkLike(post.likes),
      likes: post.likes.length,
      comments: post.comments
    })
    console.log(this.state.post);
  }

  updateComments = comments => {
    this.setState({ comments });
  };

  // call like or dislike API
  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToSignin: true });
      return false;
    }
    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;

    callApi(userId, token, postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        });
      }
    });
  };

  renderPost = post => {
    const posterId = post.postedBy ? post.postedBy._id : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";
    const { comments } = this.state;
    const { like, likes } = this.state;

    return (
      <div className="card-body">
        <div className="row">
          <div className="col-md-7">
            
            {/* avatar & postername & time */}
            {!post ? (
              <Skeleton count={2} />
            ) : (
              <>
                <Link to={`/user/${posterId}`}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${posterId}`}
                    alt={posterId}
                    style={{
                      borderRadius: "50%",
                      border: "1px solid black"
                    }}
                    className="float-left mr-2"
                    height="60px"
                    width="60px"
                    onError={i => (i.target.src = `${DefaultProfile}`)}
                  />
                </Link>
                <Link
                  to={`/user/${posterId}`}
                  style={{
                    fontSize: "30px"
                  }}
                >
                  {posterName}{" "}
                </Link>
                <p className="font-italic">
                  on {new Date(post.created).toDateString()}
                </p>
              </>
            )}
          </div>
          <div className="col-md-5">
            {/* update, delete post (admin or owner) */}
            <div className="d-inline-block float-right">
              {window.location.pathname === "/admin" && (
                <>
                  <Link
                    to={`/post/edit/${post._id}`}
                    className="btn btn-raised btn-warning btn-sm float-right"
                  >
                    Update Post
                  </Link>
                  <DeletePost postId={post._id} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* post title & image */}
        {!post ? (
          <Skeleton count={1} />
        ) : (
          <h5 className="display-3 mt-2 mb-2">{post.title}</h5>
        )}
        {!post ? (
          <Skeleton height={700} />
        ) : (
          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            alt={post.title}
            onError={i => (i.target.src = `${DefaultPost}`)}
            className="img-thunbnail mb-3"
            style={{
              maxHeight: "700px",
              width: "100%",
              objectFit: "cover"
            }}
          />
        )}

        {/* post like */}
        {like ? (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-up text-primary bg-light"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like
          </h3>
        ) : (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-up text-light bg-dark"
              style={{ padding: "10px", borderRadius: "50%" }}
            />{" "}
            {likes} Like
          </h3>
        )}
        {window.location.pathname !== "/admin" && (
          <>
            <p className="card-text">{post.body}</p>
            <Comment
              postId={post._id}
              comments={comments.reverse()}
              updateComments={this.updateComments}
            />
          </>
        )}
        <br />
      </div>
    );
  };

  render() {
    const { post, redirectToHome, redirectToSignin } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    } else if (redirectToSignin) {
      return <Redirect to={`/signin`} />;
    }

    return <div className="container">{this.renderPost(post)}</div>;
  }
}

export default SinglePost;
