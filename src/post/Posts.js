import React, { Component } from "react";
import { list } from "./apiPost";
import Skeleton from 'react-loading-skeleton';
import SinglePost from "./SinglePost";

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentWillMount() {
        this.loadPosts(this.state.page);
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    renderPosts = posts => {
        return (
            <div className="row">
                {posts.map((post, i) => {
                    return (
                        <div className="card col-md-12 mb-3" key={i}>
                            <div className="card-body">
                                <SinglePost postId={post._id} />
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
                {!posts.length ? <Skeleton height={500}/> : this.renderPosts(posts)}
                 
                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
                        onClick={() => this.loadLess(1)}>
                        Previous ({this.state.page - 1})
                    </button>
                ) : ( "" )}

                {posts.length ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore(1)}>
                        Next ({page + 1})
                    </button>
                ) : ( "")}
            </div>
        );
    }
}

export default Posts;
