// This is the component where you can see the user appointments...!

import React, { useState } from "react";
import { useSelector } from "react-redux";

const AppointmentsListing = () => {

    // Handeling redux here...!
    // calling/getting appointments posts array from redux
    const appointmentsArray = useSelector(({ userAppointmentsArr }) => { return userAppointmentsArr.appointmentsPosts });

    // Handeling states here...!
    const [searchDate, setSearchDate] = useState('');

    // Function to search date...!
    const filterDate = () => {
        let searchValue = searchDate;
        let tableClone = document.getElementById("table");
        let trClone = tableClone.getElementsByTagName("tr");

        for (let i = 1; i < trClone.length; i++) {
            let searchAppointmentDate = trClone[i].getElementsByTagName('td')[2];

            if (searchAppointmentDate) {
                let textValue = searchAppointmentDate.innerHTML;

                if (textValue.indexOf(searchValue) > -1) {
                    trClone[i].style.display = "";
                }

                else {
                    trClone[i].style.display = "none";
                }
            }
        }
    }

    return (
        // Main Container
        <div id="data-container" className="container">

            {/* Search Filter by date */}
            <div className="input-group mb-3" style={{ marginTop: "20px" }}>
                <div className="input-group-prepend">
                    <p id="search-appointment"> Search Appointment by Date: </p>
                </div>
                <input
                    autoFocus
                    type="date"
                    id="input-field"
                    className="form-control"
                    aria-label="Names"
                    aria-describedby="basic-addon1"
                    value={searchDate}
                    onChange={(event) => { setSearchDate(event.target.value) }}
                    onKeyUp={filterDate}
                    style={{ border: "1px solid blue" }}
                />
            </div>

            {/* Header */}
            <h2 id="header" style={{ color: "black" }}> All Appointments </h2>

            {/* Appointments Listing */}
            <table className="table" id="table">
                <thead>
                    <tr>
                        <th scope="col"> Name </th>
                        <th scope="col"> Contact No </th>
                        <th scope="col"> Gender </th>
                        <th scope="col"> Date </th>
                        <th scope="col"> Time </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointmentsArray.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row"> {item.name} </th>
                                    <td> {item.contact} </td>
                                    <td> {item.gender} </td>
                                    <td> {item.dateStr} </td>
                                    <td> {item.timeStr} </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentsListing;