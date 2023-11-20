import * as types from './actionTypes';

// return fetching status
export function fetchHomeData() {
    return {
        type: types.FETCH_HOME_DATA
    }
}

export function resetHomeData() {
    return {
        type: types.RESET_HOME_DATA
    }
}

// return success status
export function successHomeData(data) {
    return {
        type: types.SUCCESS_HOME_DATA,
        payload: data
    }
}

export function successHomeInvite(data) {
    return {
        type: types.SUCCESS_HOME_INVITE,
        payload: data
    }
}



// return fail status
export function failHomeData(error) {
    return {
        type: types.FAIL_HOME_DATA,
        payload: error
    }
}

export function selectHome(data) {
    return {
        type: types.SELECTED_HOME,
        payload: data
    }
}

export function selectRoom(data) {
    return {
        type: types.SELECTED_ROOM,
        payload: data
    }
}



export function fetchHomeDevice() {
    return {
        type: types.FETCH_HOME_DEVICE
    }
}

// return success status
export function successHomeDevice(data) {
    return {
        type: types.SUCCESS_HOME_DEVICE,
        payload: data
    }
}

// return fail status
export function failHomeDevice(error) {
    return {
        type: types.FAIL_HOME_DEVICE,
        payload: error
    }
}