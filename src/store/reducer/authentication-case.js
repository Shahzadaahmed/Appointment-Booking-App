// All authentication ases define here...!

import {
    SIGN_UP_USER,
    CHECK_USER,
    LOG_OUT_USER
}
    from "../constant/action-types";

const INIT_STATE = {
    authenticationUser: null
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOG_OUT_USER:
            return {
                ...state,
                authenticationUser: null
            }

        case CHECK_USER:
            return {
                ...state,
                authenticationUser: action.payload
            }

        case SIGN_UP_USER:
            return {
                ...state,
                authenticationUser: action.payload
            }

        default:
            return state;
    }
}

// Completed Successfully...!