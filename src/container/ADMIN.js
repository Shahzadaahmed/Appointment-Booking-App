// Admin Component...!

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllAppointments } from "../store/action/appointments-dispatch-funcs";
import { userSignedOut } from "../store/action/auth-dispatch-funcs";
import AppointmentsListing from "../components/appointments-listing";

const Admin = () => {

    // Handeling redux here...!
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllAppointments());
    }, []);

    // Function to log out...!
    const logOut = () => {
        dispatch(userSignedOut());
    }

    return (
        // Main Container...!
        <div className="container" id="main-container">

            {/* Log Out Button */}
            <p id="logout-btn-container">
                <button className="btn btn-primary" id="logout-btn" onClick={logOut} title="Click here to Log Out"> Log Out
            </button>
            </p>

            {/* Appointment Header */}
            <h1 id="header"> -: ADMIN PANEL :- </h1>

            <AppointmentsListing />

            <hr />
        </div>
    );
}

export default Admin;