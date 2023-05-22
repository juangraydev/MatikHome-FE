import * as types from './actionTypes';

// return fetching status
export function fetchHomeData() {
    return {
        type: types.FETCH_HOME_DATA
    }
}

// return success status
export function successHomeData(data) {
    return {
        type: types.SUCCESS_HOME_DATA,
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