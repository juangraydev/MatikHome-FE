import Http from '../../../../../shared/util/Http'

import { store } from '../../../../../store/config'
import { showMessage } from '../../../../../router/store/actionCreators'

export const getHomeList = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_ADMIN_HOUSE_LIST)
            .then((res) => {
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const addHome = (data) => {
    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_ADMIN_HOUSE_LIST, data)
            .then(response => {
		        store.dispatch(showMessage('success', "Home Added Successfully"))
                resolve(response);
            })
            .catch(error => {
                reject(error)
            })
    })
    
}

export const deleteHome = (id) => {
    return new Promise( (resolve, reject) => {
        return Http.delete(process.env.REACT_APP_API_ADMIN_HOUSE_LIST+ `${id}/`)
            .then((res) => {
                resolve(res)
		        store.dispatch(showMessage('success', "Home Delete successfully"))
            })
            .catch((err) => {
		        store.dispatch(showMessage('error', "Something when wrong. Contact the administrator"))
                reject(err)
            })
    })
}