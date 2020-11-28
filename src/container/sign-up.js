// SignUp Component...!

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSignUpUser } from "../store/action/auth-dispatch-funcs";
// Importing components from Material UI...!
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const SignUp = () => {

    // Handling redux here...!
    const dispatch = useDispatch();

    // Handling states here...!
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    // Function to sign up user...!
    const signUpUser = () => {
        dispatch(getSignUpUser(name, email, password));
        clearStates();
    }

    // Function to clear states...!
    const clearStates = () => {
        setName('');
        setEmail('');
        setPassword('');
    }

    // Function to move to sign up component...!
    const moveToLogIn = () => {
        history.push("/");
    }

    return (
        // Main Container
        <div className="container" id="sign-up-container">

            {/* Header */}
            <h1 id="sign-up-header"> Sign Up </h1>

            {/* Form Container */}
            <div id="form-container">
                <br />

                <TextField
                    autoFocus
                    id="standard-full-width1"
                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className="sign-up-form"
                    value={name}
                    onChange={(event) => { setName(event.target.value) }}
                />

                <br />

                <TextField
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

                {/* Sign Up Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={signUpUser}
                >
                    Sign Up
                </Button>

                {/* Move on to Log In component */}
                <Grid container justify="flex-end">
                    <Grid item style={{ marginTop: "15px" }}>
                        <Link href="#" variant="body2" onClick={moveToLogIn}>
                            Already have an account? Log in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default SignUp;