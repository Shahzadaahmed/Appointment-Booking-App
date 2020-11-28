// All appointments dispatch functions define here...!

import swal from 'sweetalert';
import {
    USER_APPOINTMENT_POST,
    DELETE_APPOINTMENT_POST,
    EDIT_APPOINTMENT_POST
}
    from "../constant/action-types";
import * as firebase from "firebase";

// Dispatch function for saving user appointment post in firebase database...!
export function userPost(postObj) {
    return dispatch => {
        // Add a new user appointment post with a generated id in firebase database...!
        firebase.firestore().collection("Users-Appointments").add(postObj)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                swal({
                    title: "Appointment Created 🥰",
                    text: "Your appointment has been booked successfully!",
                    icon: "success",
                    button: "Ok!",
                });
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}

// Dispatch function for getting/calling current user appointment post from firebase database...!
export function fetchUserPostsData(uid) {
    return dispatch => {
        firebase.firestore().collection("Users-Appointments").where("currentUserUID", "==", uid).orderBy("dateStr", "asc")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        // console.log("New Appointment: ", change.doc.data());
                        // console.log(change.doc.id);
                        let userAppointments = change.doc.data();
                        userAppointments.docId = change.doc.id;
                        // console.log(userAppointments);
                        dispatch({
                            type: USER_APPOINTMENT_POST,
                            payload: userAppointments
                        })
                    }
                });
            });
    }
}

// Dispatch function for getting/calling all user appointment post from firebase database...!
export function fetchAllAppointments() {
    return dispatch => {
        firebase.firestore().collection("Users-Appointments").orderBy("dateStr", "asc")
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        // console.log("New Appointment: ", change.doc.data());
                        // console.log(change.doc.id);
                        let userAppointments = change.doc.data();
                        userAppointments.docId = change.doc.id;
                        // console.log(userAppointments);
                        dispatch({
                            type: USER_APPOINTMENT_POST,
                            payload: userAppointments
                        })
                    }
                });
            });
    }
}

// Dispatch function to delete appointment...!
export function deleteAppointmentPost(docId, postIndex) {
    return dispatch => {
        firebase.firestore().collection("Users-Appointments").doc(docId).delete()
            .then(() => {
                console.log("Document successfully deleted!");
                dispatch({
                    type: DELETE_APPOINTMENT_POST,
                    payload: postIndex
                });
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
}

// Dispatch function to edit appointment...!
export function editApointmentPost(updatePostObj, docId, postIndex) {
    return dispatch => {
        firebase.firestore().collection("Users-Appointments").doc(docId).update(updatePostObj)
            .then(() => {
                console.log("Appointment Post Updated Successfully!");
                updatePostObj.indexKey = postIndex;
                dispatch({
                    type: EDIT_APPOINTMENT_POST,
                    payload: updatePostObj
                });
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
}