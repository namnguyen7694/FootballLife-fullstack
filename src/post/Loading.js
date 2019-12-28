import React, { Component } from "react";
import Skeleton from "react-loading-skeleton";

class Loading extends Component {
  render() {
    return (
      <div>
        <div className="card col-md-12 mb-3">
          <div className="card-body">
            <div className="card-body">
              <div className="row">
                <div className="col-md-7">
                  <Skeleton circle={true} height={50} width={50} />
                  <Skeleton count={2} />
                </div>
                <div className="col-md-12">
                  <Skeleton height={200} />
                  <Skeleton height={400} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
