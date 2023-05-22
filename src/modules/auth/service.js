import Http from '../../shared/util/Http'
import {
    fetchUserData,
    successUserData,
    failUserData,
    setUserSessionExpired,
    resetUserSessionExpired
} from './store/actionCreators'
import { store } from '../../store/config'
import { showMessage } from '../../router/store/actionCreators'


export const loginAPI = (data) => async dispatch => {
    return new Promise(async (resolve, reject) => {
        dispatch(fetchUserData());
        return Http.post(process.env.REACT_APP_API_LOGIN, data)
            .then(response => {
                console.log('[LOGIN] Retrieving token data',response.data.body?.data)
                dispatch(successUserData(response.data.body?.data));
                localStorage.setItem("TOKEN", response.data.body?.data?.token)
		        store.dispatch(showMessage('success', "Login Success"))
                resolve(response.data.body?.data?.token);
                
            })
            .catch(error => {
                console.log('[LOGIN] Error token data', error)
                dispatch(failUserData(error));
		        store.dispatch(showMessage('error', "Incorrect username or password"))
                reject(error)
            })
    })
}
export const registerAPI = async (data) => {
    return new Promise(async (resolve, reject) => {
        // dispatch(fetchLoginTokenData())
        return Http.post(process.env.REACT_APP_API_REGISTER, data)
            .then(response => {
                localStorage.setItem("TOKEN", response.data.body?.data?.token)
		        store.dispatch(showMessage('success', "Register Success"))
                resolve(response.data.body?.data?.token)
            })
            .catch(error => {
                // logger('[REGISTER] Error token data')
                console.log('[REGISTER] Error token data', error)
		        store.dispatch(showMessage('error', "Something when wrong. Connact the administrator"))
                reject(error)
            })
    })
}



//get example
// export function getDivSummary(divCode, reportID) {
// 	return function (dispatch) {
// 		return Http.get(
// 			process.env.REACT_APP_API_DIVISION_SUMMARY + divCode + '/' + reportID,
// 		)
// 	}
// }
