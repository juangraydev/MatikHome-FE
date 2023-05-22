// import Http from '../../../../shared/util/Http';
import * as types from './actionTypes';
// initial state
const initialState = {
    isPending: false,
    summaryData: null,
    userMgmtData: null,
    deviceMgmtData: null,
    homeMgmtData: null,
    error: null,
    sessionExp: false
}
/* Function: reducer()
* Description: fetch data from API /info_data
* InParam:
* -state : initail state,
* - action
* OutParam:
* - none
*/
export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.FETCH_SUMMARY_DATA:
            return {
                ...state,
                isPending: true,
            };
        case types.SUCCESS_SUMMARY_DATA:
            return {
                ...state,
                isPending: false,
                summaryData: payload
            };
        case types.FAIL_SUMMARY_DATA:
            return {
                ...state,
                isPending: false,
                error: payload
            };
            
        //User Management 
        case types.FETCH_USER_MGMT_DATA:
            return {
                ...state,
                isPending: true,
            };
        case types.SUCCESS_USER_MGMT_DATA:
            return {
                ...state,
                isPending: false,
                userMgmtData: payload
            };
        case types.FAIL_USER_MGMT_DATA:
            return {
                ...state,
                isPending: false,
                error: payload
            };

        //Device Management 
        case types.FETCH_DEVICE_MGMT_DATA:
            return {
                ...state,
                isPending: true,
            };
        case types.SUCCESS_DEVICE_MGMT_DATA:
            return {
                ...state,
                isPending: false,
                deviceMgmtData: payload
            };
        case types.FAIL_DEVICE_MGMT_DATA:
            return {
                ...state,
                isPending: false,
                error: payload
            };

        //Home Management 
        case types.FETCH_HOME_MGMT_DATA:
            return {
                ...state,
                isPending: true,
            };
        case types.SUCCESS_HOME_MGMT_DATA:
            return {
                ...state,
                isPending: false,
                homeMgmtData: payload
            };
        case types.FAIL_HOME_MGMT_DATA:
            return {
                ...state,
                isPending: false,
                error: payload
            };
        default:
            return state;
    }

}