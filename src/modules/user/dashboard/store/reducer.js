// import Http from '../../../../shared/util/Http';
import * as types from './actionTypes';
// initial state
const initialState = {
    isPending: false,
    data: null,
    error: null,
    selectedHome: null,
    selectedRoom: null,

    inviteList: [],

    isPendingDevice: false,
    dataDevice: null,
    errorDevice: null
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
        case type.SUCCESS_HOME_INVITE: 
            return {
                ...state,
                isPending: false,
                inviteList: payload
            };

        case types.FETCH_HOME_DATA:
            return {
                ...state,
                isPending: true,
            };
        case types.SUCCESS_HOME_DATA:
            console.log("[reducer]", payload);
            return {
                ...state,
                isPending: false,
                data: payload
            };
        case types.FAIL_HOME_DATA:
            return {
                ...state,
                isPending: false,
                error: payload
            };
        case types.RESET_HOME_DATA:
            return initialState;

        case types.SELECTED_HOME:
            return{
                ...state,
                selectedHome: payload
            }
            
        case types.SELECTED_ROOM:
            return{
                ...state,
                selectedRoom: payload
        }
        /**
         * Device list
         */
        case types.FETCH_HOME_DEVICE:
            return {
                ...state,
                isPendingDevice: true,
            };
        case types.SUCCESS_HOME_DEVICE:
            return {
                ...state,
                isPendingDevice: false,
                dataDevice: payload
            };
        case types.FAIL_HOME_DEVICE:
            return {
                ...state,
                isPendingDevice: false,
                errorDevice: payload
            };
        default:
            return state;
    }

}