import Http from '../../../../../shared/util/Http'

import { store } from '../../../../../store/config'
import { showMessage } from '../../../../../router/store/actionCreators'

export const createDevice = ( data ) => async dispatch => {

    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_DEVICE_LIST, data)
            .then(response => {
		        store.dispatch(showMessage('success', "Device Created Successfully"))
                resolve();
            })
            .catch(error => {
                reject()
            })
    })
}

export const getAdminDeviceAPI = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_ADMIN_DEVICE_LIST)
            .then((res) => {
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const addAdminDeviceAPI = ( data ) => async dispatch => {

    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_ADMIN_DEVICE_LIST, data)
            .then(response => {
		        store.dispatch(showMessage('success', "Device Created Successfully"))
                resolve();
            })
            .catch(error => {
                reject()
            })
    })
}

export const editAdminDeviceAPI = ( data ) => async dispatch => {

    return new Promise(async (resolve, reject) => {
        return Http.put(process.env.REACT_APP_API_ADMIN_DEVICE_LIST, data)
            .then(response => {
		        store.dispatch(showMessage('success', "Device Created Successfully"))
                resolve();
            })
            .catch(error => {
                reject()
            })
    })
}

export const deleteAdminDevice = (id) => {
    return new Promise( (resolve, reject) => {
        return Http.delete(process.env.REACT_APP_API_ADMIN_DEVICE_LIST+id+"/")
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

