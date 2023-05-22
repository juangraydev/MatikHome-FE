import * as types from './actionTypes';

// Summary Actions

// return fetching status
export function fetchSummaryData() {
    return {
        type: types.FETCH_SUMMARY_DATA
    }
}

// return success status
export function successSummaryData(data) {
    return {
        type: types.SUCCESS_SUMMARY_DATA,
        payload: data
    }
}

// return fail status
export function failSummaryData(error) {
    return {
        type: types.FAIL_SUMMARY_DATA,
        payload: error
    }
}


// User Actions

// return fetching status
export function fetchUserMgmtData() {
    return {
        type: types.FETCH_USER_MGMT_DATA
    }
}

// return success status
export function successUserMgmtData(data) {
    return {
        type: types.SUCCESS_USER_MGMT_DATA,
        payload: data
    }
}

// return fail status
export function failUserMgmtData(error) {
    return {
        type: types.FAIL_USER_MGMT_DATA,
        payload: error
    }
}


// Device Actions

// return fetching status
export function fetchDeviceMgmtData() {
    return {
        type: types.FETCH_DEVICE_MGMT_DATA
    }
}

// return success status
export function successDeviceMgmtData(data) {
    return {
        type: types.SUCCESS_DEVICE_MGMT_DATA,
        payload: data
    }
}

// return fail status
export function failDeviceMgmtData(error) {
    return {
        type: types.FAIL_DEVICE_MGMT_DATA,
        payload: error
    }
}


// Home Actions

// return fetching status
export function fetchHomeMgmtData() {
    return {
        type: types.FETCH_HOME_MGMT_DATA
    }
}

// return success status
export function successHomeMgmtData(data) {
    return {
        type: types.SUCCESS_HOME_MGMT_DATA,
        payload: data
    }
}

// return fail status
export function failHomeMgmtData(error) {
    return {
        type: types.FAIL_HOME_MGMT_DATA,
        payload: error
    }
}