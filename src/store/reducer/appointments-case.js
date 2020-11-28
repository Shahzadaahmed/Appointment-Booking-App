// All appointments ases define here...!

import swal from 'sweetalert';
import {
    USER_APPOINTMENT_POST,
    DELETE_APPOINTMENT_POST,
    EDIT_APPOINTMENT_POST,
    LOG_OUT_USER
}
    from "../constant/action-types";

const INIT_STATE = {
    appointmentsPosts: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case EDIT_APPOINTMENT_POST:
            let userAppointmentsArray4 = state.appointmentsPosts.slice(0);
            let name = action.payload.name;
            let contact = action.payload.contact;
            let dateStr = action.payload.dateStr;
            let timeStr = action.payload.timeStr;
            let gender = action.payload.gender;
            let finalObj = {
                name,
                contact,
                dateStr,
                timeStr,
                gender
            }
            userAppointmentsArray4.splice(action.payload.indexKey, 1, finalObj);
            swal({
                title: "Appointment Updated! 🥰",
                text: "Your appointment has been updated succesfully!",
                icon: "success",
                button: "Ok!",
            });
            return {
                ...state,
                appointmentsPosts: userAppointmentsArray4
            }

        case DELETE_APPOINTMENT_POST:
            let userAppointmentsArray3 = state.appointmentsPosts.slice(0);
            userAppointmentsArray3.splice(action.payload, 1);
            swal({
                title: "Appointment Deleted!",
                text: "Your appointment has been deleted succesfully!",
                icon: "success",
                button: "Ok!",
            });
            return {
                ...state,
                appointmentsPosts: userAppointmentsArray3
            }

        case USER_APPOINTMENT_POST:
            let userAppointmentsArray = state.appointmentsPosts.slice(0);
            userAppointmentsArray.push(action.payload);
            return {
                ...state,
                appointmentsPosts: userAppointmentsArray
            }

        case LOG_OUT_USER:
            let userAppointmentsArray2 = state.appointmentsPosts.slice(0);
            userAppointmentsArray2.splice(0, userAppointmentsArray2.length);
            return {
                ...state,
                appointmentsPosts: userAppointmentsArray2
            }

        default:
            return state;
    }
}