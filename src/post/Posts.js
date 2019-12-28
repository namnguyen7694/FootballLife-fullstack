import React, { Component } from "react";
import { list } from "./apiPost";
import SinglePost from "./SinglePost";
import { isAuthenticated } from "../auth";
import Loading from "./Loading";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    };
  }

  loadPosts = async page => {
    const data = await list(page);
    this.setState({ posts: data });
  };

  checkLike = likes => {
    const userId = isAuthenticated() && isAuthenticated()._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  async componentDidMount() {
    await this.loadPosts(this.state.page);
  }

  loadMore = async number => {
    await this.setState({ page: this.state.page + number });
    await this.loadPosts(this.state.page);
  };

  loadLess = async number => {
    await this.setState({ page: this.state.page - number });
    await this.loadPosts(this.state.page);
  };

  listenChange = async () => {
    await this.loadPosts(this.state.page);
  };
  renderPosts = posts => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          return (
            <div className="card col-md-12 mb-3" key={i}>
              <div className="card-body">
                {/* Load all post and detail */}
                <SinglePost
                  post={post}
                  listenChange={() => this.listenChange()}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {!posts.length ? "Loading Posts..." : "Recent Posts"}
        </h2>
        {!posts.length ? <Loading/> : (this.renderPosts(posts))}

        {/* Next & Prev button */}
        {page > 1 ? (
          <button
            className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
            onClick={() => this.loadLess(1)}
          >
            Previous ({this.state.page - 1})
          </button>
        ) : (
          ""
        )}
        
        {posts.length ? (
          <button
            className="btn btn-raised btn-success mt-5 mb-5"
            onClick={() => this.loadMore(1)}
          >
            Next ({page + 1})
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Posts;
