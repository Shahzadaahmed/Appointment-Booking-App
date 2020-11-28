// Home Component...!

import React from "react";
import { useSelector } from "react-redux";
import Admin from "./ADMIN";
import Appointments from "./appointments";

const Home = () => {

    // Handeling redux here...!
    const getUserFromRedux = useSelector(({ currentUser }) => { return currentUser.authenticationUser });
    // console.log(getUserFromRedux);

    return (
        <div>
            {
                (getUserFromRedux && getUserFromRedux.role === "Admin")
                    ?
                    (<Admin />)
                    :
                    (<Appointments />)
            }
        </div>
    );
}

export default Home;