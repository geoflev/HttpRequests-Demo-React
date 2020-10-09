import React, { Component } from "react";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import "./Blog.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import asyncComponent from "../../hoc/AsyncComponent";

const AsyncNewPost = asyncComponent(() => {
  //dynamic import when NewPost component needed
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true,
  };
  //NavLink is the same as Link but has some aditions f.e. the class so we can make
  // 1 link active
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/** switch to always pick one to render */}
        <Switch>
          {/* to conditionally render a page if auth is needed*/}
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          {/*<Route path="/new-post" component={NewPost} />*/}
          <Route path="/posts" component={Posts} />
          {/* 2nd way for managing 404, should always be last */}
          <Route render={() => <h1>Not Found</h1>} />
          {/*
            catches all unknown pages and redirects, so no 404
            1st solution to this
        <Redirect from="/" to="/posts" />*/}
        </Switch>
      </div>
    );
  }
}

export default Blog;
