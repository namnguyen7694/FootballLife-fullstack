import React, { Component } from "react";
import { singlePost } from "./apiPost";
import SinglePost from "./SinglePost";
import { isAuthenticated } from "../auth";
import Loading from "./Loading";

class PostById extends Component {
    state = {
        post: ''
    };

    checkLike = likes => {
        const userId = isAuthenticated() && isAuthenticated()._id;
        let match = likes.indexOf(userId) !== -1;
        return match;
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data
                });
            }
        });
    };

    renderPosts = post => {
        return (
          <div className="row">
                <div className="card col-md-12 mb-3">
                  <div className="card-body">
                    <SinglePost
                      post={post}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      };

      render() {
        const { post } = this.state;
        return (
          <div className="container">
            <h2 className="mt-5 mb-5">
              {!post ? "Loading Posts..." : "Recent Posts"}
            </h2>
            {!post ? <Loading/> : (this.renderPosts(post))}
          </div>
        );
      }
    }
export default PostById;
