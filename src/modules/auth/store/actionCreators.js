import * as types from './actionTypes';

// return fetching status
export function fetchUserData() {
    return {
        type: types.FETCH_USER_DATA
    }
}

// return success status
export function successUserData(data) {
    return {
        type: types.SUCCESS_USER_DATA,
        payload: data
    }
}

// return success status
export function resetUserData() {
    return {
        type: types.SUCCESS_USER_DATA
    }
}

// return fail status
export function failUserData(error) {
    return {
        type: types.FAIL_USER_DATA,
        payload: error
    }
}

// set user session expired true for login modal info
export function setUserSessionExpired() {
    return {
        type: types.SET_USER_EXPIRED
    }
}

// reset upon login
export function resetUserSessionState() {
    return {
        type: types.RESET_USER_EXPIRED
    }
}