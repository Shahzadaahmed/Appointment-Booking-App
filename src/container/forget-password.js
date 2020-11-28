// ForgetPassword Component...!

import React, { useState } from "react";
// Importing components from Material UI...!
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Link from '@material-ui/core/Link';
import { userForgetPassword } from "../store/action/auth-dispatch-funcs";

const ForgetPassword = () => {

    // Handeling states here...!
    const [email, setEmail] = useState('');

    // Handeling redux here...!
    const dispatch = useDispatch();

    const history = useHistory();

    // Function to move to log in component...!
    const moveToLogIn = () => {
        history.push("/");
    }

    // Function to clear states...!
    const clearStates = () => {
        setEmail('');
    }

    // Function to forget password...!
    const forgetPassword = () => {
        let validationForEmail = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

        if (email.match(validationForEmail)) {
            dispatch(userForgetPassword(email, clearStates));
            clearStates();
        }

        else {
            swal({
                title: "Error! 😠",
                text: "Invalid Email Format",
                icon: "error",
                button: "Try Again!",
            });
            clearStates();
        }
    }

    return (
        // Main Container...!
        <div id="father-container">

            {/* Main Container */}
            <div className="container" id="registeration-container">

                {/* Header */}
                <h2 id="password-reset-header"> Enter email to Reset Password </h2>

                {/* Input Field Container */}
                <div className="input-group mb-3" id="inputfield-container">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Email : </span>
                    </div>
                    <input
                        autoFocus
                        type="email"
                        id="reset_email"
                        className="form-control"
                        placeholder="name@company.com"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        title="Enter Youe Email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </div>

                {/* Button Container */}
                <p id="btn-container">
                    <button className="btn btn-primary" id="reset-password-btn" onClick={forgetPassword}> Reset password </button>
                </p>

                {/* Footer */}
                <p id="btn-last-container">
                    <Link id="reset-password-el" onClick={moveToLogIn}> Log In Again </Link>
                </p>
            </div>
        </div>
    );
}

export default ForgetPassword;