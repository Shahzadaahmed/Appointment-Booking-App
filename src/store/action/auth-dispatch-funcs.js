// All authentication dispatch functions define here...!

import swal from 'sweetalert';
import {
    SIGN_UP_USER,
    CHECK_USER,
    LOG_OUT_USER
}
    from "../constant/action-types";

import * as firebase from "firebase";
// Firebase configuration here...!
var firebaseConfig = {
    apiKey: "AIzaSyDSmuifHtpmn4KWpJnSFMvcPR-QWahjxd8",
    authDomain: "appointment-booking-app-76196.firebaseapp.com",
    databaseURL: "https://appointment-booking-app-76196.firebaseio.com",
    projectId: "appointment-booking-app-76196",
    storageBucket: "appointment-booking-app-76196.appspot.com",
    messagingSenderId: "949609888385",
    appId: "1:949609888385:web:bd0adffddd38a257bbeb80",
    measurementId: "G-1D01VFMWLV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Declaring global variable for saving user UID...!
let userUID;

// Dispatch function to sign up user...!
export function getSignUpUser(name, email, password) {
    return dispatch => {
        // Firebase authentication...!
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((successUser) => {
                userUID = successUser.user.uid;
                // Saving user data in firebase database...!
                firebase.firestore().collection("users").add({
                    name,
                    email,
                    userUID
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        let userObj = {
                            name,
                            email,
                            userUID
                        }
                        // Saving user object in redux...!
                        dispatch({
                            type: SIGN_UP_USER,
                            payload: userObj
                        });
                        swal({
                            title: "Signed Up! 🥰",
                            text: "You have Signed Up Succesfully!",
                            icon: "success",
                            button: "Let's Go!",
                        });
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            })
            .catch((error) => {
                swal({
                    title: "Error! 😠",
                    text: `${error}`,
                    icon: "error",
                    button: "Try Again!",
                });
                console.error(`${error}`);
            });
    }
}

// Dispatch function to log in user...!
export function getLogInUser(email, password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((successUser) => {
                // console.log(successUser);
                swal({
                    title: "Logged In! 🥰",
                    text: "You have Logged In Succesfully!",
                    icon: "success",
                    button: "Let's Go!",
                });
            })
            .catch((error) => {
                swal({
                    title: "Error! 😠",
                    text: `${error}`,
                    icon: "error",
                    button: "Try Again!",
                });
                console.error(`${error}`);
            });
    }
}

// Dispatch function to get current signed in user...!
export function fetchUser(uid) {
    // console.log(uid);

    return dispatch => {
        firebase.firestore().collection("users").where("userUID", "==", uid).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    dispatch({
                        type: CHECK_USER,
                        payload: doc.data()
                    });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
}

// Dispatch function to log out user...!
export function userSignedOut() {
    return dispatch => {
        firebase.auth().signOut()
            .then(() => {
                // User Sign-out successful.
                dispatch({
                    type: LOG_OUT_USER
                });
                swal({
                    title: "Good Bye! 🥰",
                    text: "You have Logged Out Successfully!",
                    icon: "success",
                    button: "By Now!",
                });
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
    }
}

// Dispatch function to forget password...!
export function userForgetPassword(email) {
    return dispatch => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                // Email sent.
                console.log("Pasword reset email has been sent to you!\nKindly check your email and forget the password!");
                swal({
                    title: "Email Sent!",
                    text: "Pasword reset email has been sent to you!\nKindly check your email and forget the password!",
                    icon: "success",
                    button: "Ok!",
                });
            }).catch((error) => {
                // An error happened.
                console.error(`Error is: ${error}`);
            });
    }
}