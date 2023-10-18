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
                dispatch(successUserData(response.data.body?.data));
                localStorage.setItem("TOKEN", response.data.body?.data?.token)
		        store.dispatch(showMessage('success', "Login Success"))
                resolve(response.data.body?.data?.token);
                
            })
            .catch(error => {
                // debugger
                dispatch(failUserData(error));
		        // store.dispatch(showMessage('error', "Incorrect username or password"))
                reject(error)
            })
    })
}
export const registerAPI = (data)  => async dispatch => {
    return new Promise(async (resolve, reject) => {
        dispatch(fetchUserData());
        return Http.post(process.env.REACT_APP_API_REGISTER, data)
            .then(response => {
                localStorage.setItem("TOKEN", response.data.body?.data?.token)
                dispatch(successUserData(response.data.body?.data));
		        store.dispatch(showMessage('success', "Register Success"))
                resolve(response.data.body?.data?.token)
            })
            .catch(error => {
                console.log("[Register][Error]");
		        // store.dispatch(showMessage('error', "Something when wrong. Contact the administrator"))
                // reject(error)
            })
    })
}
