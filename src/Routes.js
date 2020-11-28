// Main Routes Component...!

import React, { useEffect } from "react";
import * as firebase from "firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./store/action/auth-dispatch-funcs";
import Admin from "./container/ADMIN";
import SignUp from "./container/sign-up";
import LogIn from "./container/log-in";
import ForgetPassword from "./container/forget-password";
import Home from "./container/home";

const Routes = () => {

    // Handling redux here...!
    const dispatch = useDispatch();

    useEffect(() => {
        // Get the currently signed-in user...!
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // console.log(user.uid);
                dispatch(fetchUser(user.uid));
            }
        });
    }, []);

    const getUserFromRedux = useSelector(({ currentUser }) => { return currentUser.authenticationUser });
    // console.log(getUserFromRedux);

    return (
        <Router>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/" component={(getUserFromRedux) ? (Home) : (LogIn)} />
            </Switch>
        </Router>
    );
}

export default Routes;