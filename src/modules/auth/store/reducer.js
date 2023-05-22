// import Http from '../../../../shared/util/Http';
import * as types from './actionTypes';
// initial state
const initialState = {
    fetching: false,
    data: null,
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
        case types.FETCH_USER_DATA:
            return {
                ...state,
                isPending: true,
            };
        case types.SUCCESS_USER_DATA:
            return {
                ...state,
                isPending: false,
                data: payload
            };
        case types.FAIL_USER_DATA:
            return {
                ...state,
                isPending: false,
                error: payload
            };
        case types.RESET_USER_DATA:
            return {
                ...state,
                isPending: false,
                data: initialState
            };
        case types.SET_USER_EXPIRED:
            return {
                ...state,
                sessionExp: true
                }
        case types.RESET_USER_EXPIRED:
            return {
                ...state,
                sessionExp: true
                }
        default:
            return state;
    }

}