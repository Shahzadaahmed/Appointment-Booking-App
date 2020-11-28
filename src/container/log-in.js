// LogIn Component...!

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLogInUser } from "../store/action/auth-dispatch-funcs";
// Importing components from Material UI...!
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const LogIn = () => {

    // Handling redux here...!
    const dispatch = useDispatch();

    // Handling states here...!
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    // Function to log in user...!
    const logInUser = () => {
        dispatch(getLogInUser(email, password));
        clearStates();
    }

    // Function to clear states...!
    const clearStates = () => {
        setEmail('');
        setPassword('');
    }

    // Function to move to sign up component...!
    const moveToSignUp = () => {
        history.push("/sign-up");
    }

    // Function to move to forget password component...!
    const moveToForgetPassword = () => {
        history.push("/forget-password");
    }

    return (
        // Main Container
        <div className="container" id="sign-up-container">

            {/* Header */}
            <h1 id="sign-up-header"> Log In </h1>

            {/* Form Container */}
            <div id="form-container">
                <br />

                <TextField
                    autoFocus
                    id="standard-full-width2"
                    label="Email"
                    style={{ margin: 8 }}
                    placeholder="Email"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="sign-up-form"
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                />

                <br />

                <TextField
                    type="password"
                    id="standard-full-width3"
                    label="Password"
                    style={{ margin: 8 }}
                    placeholder="*****"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="sign-up-form"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                />

                <br />

                {/* Log In Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={logInUser}
                >
                    Log In
                </Button>

                {/* Move on to Sign Up component */}
                <Grid container style={{ marginTop: "15px" }}>
                    <Grid item xs>
                        <Link variant="body2" onClick={moveToForgetPassword} style={{ cursor: "pointer" }}> Forgot password? </Link>
                    </Grid>

                    <Grid item>
                        <Link variant="body2" onClick={moveToSignUp} style={{ cursor: "pointer" }}> Don't have an account? Sign Up </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default LogIn;