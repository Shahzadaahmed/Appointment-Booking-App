// Appointments Component...!

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPost } from "../store/action/appointments-dispatch-funcs";
import { userSignedOut } from "../store/action/auth-dispatch-funcs";
import { fetchUserPostsData, deleteAppointmentPost, editApointmentPost } from "../store/action/appointments-dispatch-funcs";
import swal from 'sweetalert';

// Delaring global variable for update item...!
let appointmentDocId;
let postIndex;

const Appointments = () => {

    // Handeling redux here...!
    const dispatch = useDispatch();
    const getUserFromRedux = useSelector(({ currentUser }) => { return currentUser.authenticationUser });
    // console.log(getUserFromRedux.userUID);
    // calling/getting current user appointments posts array from redux
    const appointmentsArray = useSelector(({ userAppointmentsArr }) => { return userAppointmentsArr.appointmentsPosts });

    // Handeling states here...!
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [dateStr, setDateStr] = useState('');
    const [timeStr, setTimeStr] = useState('');
    const [gender, setGender] = useState('Male');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchUserPostsData(getUserFromRedux.userUID));
    }, []);

    // Function to add appointment post...!
    const appointmentPost = () => {
        let userData = {
            name,
            contact,
            dateStr,
            timeStr,
            gender,
            currentUserUID: getUserFromRedux.userUID
        }

        // Note: User cannot select past date...!
        let today = new Date();
        let userSelectedDate = new Date(dateStr);

        // Converting both times in miliseconds...!
        today = today.getTime();
        userSelectedDate = userSelectedDate.getTime();

        if (userSelectedDate <= today) {
            swal({
                title: "Something Went Wrong! 😠",
                text: "You cannot select past date!!!",
                icon: "error",
                button: "Try Again",
            });
        }

        else {
            if (userData.name != 0 &&
                userData.contact != 0 &&
                userData.dateStr != 0 &&
                userData.timeStr != 0 &&
                userData.gender != 0
            ) {
                dispatch(userPost(userData));
                clearStates();
            }

            else {
                swal({
                    title: "Something Went Wrong! 😠",
                    text: "You need to fill all the required fields!",
                    icon: "error",
                    button: "Try Again",
                });
                clearStates();
            }
        }
    }

    // Function to clearStates...!
    const clearStates = () => {
        setName('');
        setContact('');
        setDateStr('');
        setTimeStr('');
        setGender('');
    }

    // Function to log out user...!
    const logOutUser = () => {
        dispatch(userSignedOut());
    }

    // Function to delete appointment...!
    const deleteAppointment = (event) => {
        let { id, className } = event.target;
        dispatch(deleteAppointmentPost(id, className));
    }

    // Function to edit appointment...!
    const editAppointment = (event) => {
        let { id, className } = event.target;
        appointmentDocId = id;
        postIndex = className;
        setIsEditing(true);
        setName(appointmentsArray[postIndex].name);
        setContact(appointmentsArray[postIndex].contact);
        setDateStr(appointmentsArray[postIndex].dateStr);
        setTimeStr(appointmentsArray[postIndex].timeStr);
        setGender(appointmentsArray[postIndex].gender);

        document.getElementById("target-element").disabled = true;
        document.getElementById("target-element1").disabled = true;
        document.getElementById("target-element2").disabled = true;
    }

    // Function to update appointment...!
    const updateAppointment = () => {
        let today = new Date();
        let userSelectedDate = new Date(dateStr);

        // Converting both times in miliseconds...!
        today = today.getTime();
        userSelectedDate = userSelectedDate.getTime();

        // If the user selected date is less than today then he cannot edit post...!
        if (userSelectedDate <= today) {
            swal({
                title: "Something Went Wrong! 😠",
                text: "You cannot set Past Time!!!",
                icon: "error",
                button: "Try Again",
            });
        }

        else {
            let userData = {
                name,
                contact,
                dateStr,
                timeStr,
                gender
            }
            dispatch(editApointmentPost(userData, appointmentDocId, postIndex));
            setIsEditing(false);
            clearStates();
            document.getElementById("target-element").disabled = false;
            document.getElementById("target-element1").disabled = false;
            document.getElementById("target-element2").disabled = false;
        }
    }

    // Function to cancel updating...!
    const cancel = () => {
        setIsEditing(false);
        document.getElementById("target-element").disabled = false;
        document.getElementById("target-element1").disabled = false;
        document.getElementById("target-element2").disabled = false;
        clearStates();
    }

    return (
        <div className="container" id="main-container">

            {/* Log Out Button */}
            <p id="logout-btn-container">
                <button className="btn btn-primary" id="logout-btn" onClick={logOutUser} title="Click here to Log Out"> Log Out
            </button>
            </p>

            {/* Appointment Header */}
            <h1 id="header"> -: Create Appointment :- </h1>

            {/* Form Container */}
            <div id="appointment-container">

                <div className="input-group mb-3" id="inputfield-container">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Name: </span>
                    </div>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Enter Name"
                        id="target-element"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                </div>

                <div className="input-group mb-3" id="inputfield-container">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Contact: </span>
                    </div>
                    <input
                        type="number"
                        placeholder="Contact Num..."
                        id="target-element1"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        value={contact}
                        onChange={(event) => { setContact(event.target.value) }}
                    />
                </div>

                <div className="input-group mb-3" id="inputfield-container">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Set Date: </span>
                    </div>
                    <input
                        type="date"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        value={dateStr}
                        onChange={(event) => { setDateStr(event.target.value) }}
                    />
                </div>

                <div className="input-group mb-3" id="inputfield-container">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> Set Time: </span>
                    </div>
                    <input
                        type="time"
                        className="form-control"
                        aria-describedby="basic-addon1"
                        value={timeStr}
                        onChange={(event) => { setTimeStr(event.target.value) }}
                    />
                </div>

                <div className="dropdown"> Select Gender:
                    <select value={gender} onChange={(event) => { setGender(event.target.value) }} id="target-element2">
                        <option value="Male"> Male </option>
                        <option value="Female"> Female </option>
                    </select>
                </div>
                <hr />

                {/* Buttons */}
                {
                    (isEditing)
                        ?
                        (
                            <p id="btn-container">
                                <button style={{ marginRight: "10px" }} id="add-appointment" className="btn btn-primary" onClick={updateAppointment}> Update Appointment </button>
                                <button id="add-appointment" className="btn btn-primary" onClick={cancel}> Cancel </button>
                            </p>
                        )
                        :
                        (
                            <p id="btn-container">
                                <button id="add-appointment" className="btn btn-primary" onClick={appointmentPost}> Add Appointment </button>
                            </p>
                        )
                }
            </div>

            <hr />

            {/* User Appointments data on DOM */}

            {/* Appointkment data container */}
            <div id="data-container" className="container">

                {/* Header */}
                <h2 id="header" style={{ color: "black" }}> Your Appointments </h2>

                {/* Table container */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"> Name </th>
                            <th scope="col"> Contact No </th>
                            <th scope="col"> Gender </th>
                            <th scope="col"> Date </th>
                            <th scope="col"> Time </th>
                            <th scope="col"> Delete </th>
                            <th scope="col"> Edit </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointmentsArray.map((item, index) => {
                                let postDocId = item.docId;
                                return (
                                    <tr key={index}>
                                        <th scope="row"> {item.name} </th>
                                        <td> {item.contact} </td>
                                        <td> {item.gender} </td>
                                        <td> {item.dateStr} </td>
                                        <td> {item.timeStr} </td>
                                        <td>
                                            <button onClick={deleteAppointment} id={postDocId} className={index} style={styleSheet.btns}>
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={editAppointment} id={postDocId} className={index} style={styleSheet.btns}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            <hr />

        </div>
    );
}

const styleSheet = {
    btns: {
        backgroundColor: "#0069D9",
        color: "white",
        width: "100px",
        height: "30px",
        fontWeight: "bold",
        border: "2px solid darkblue",
        outline: "0px",
        borderRadius: "5px"
    }
}

export default Appointments;