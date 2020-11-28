// Note: index.js file of reducer folder...!

import { combineReducers } from "redux";
import authenticationUser from "./authentication-case";
import appointmentsPosts from "./appointments-case";

export default combineReducers({
    currentUser: authenticationUser,
    userAppointmentsArr: appointmentsPosts
});