import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import PostById from "./post/PostById";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from "./admin/Admin";
import NotFound from "./core/NotFound";

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={PostById} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
            <PrivateRoute exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <Route path="*" component={NotFound} />
            <Route exact path="/userNotFound" component={NotFound} />
        </Switch>
    </div>
);

export default MainRouter;
