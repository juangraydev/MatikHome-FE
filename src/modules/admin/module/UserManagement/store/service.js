import Http from '../../../../../shared/util/Http'

import { store } from '../../../../../store/config'
import { showMessage } from '../../../../../router/store/actionCreators'

export const getUserList = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_ADMIN_USER_LIST)
            .then((res) => {
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// export const addUser = (userInfo) => {
//     return new Promise( async (resolve, reject) => {
//         return Http.post(process.env.REACT_APP_API_ADMIN_USER_LIST, userInfo)
//             .then((res) => {
//                 resolve(res?.data?.body?.data)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }

export const addUser = (data)  => async dispatch => {
    console.log("[addUser]", data);
    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_ADMIN_USER_LIST, data)
            .then(response => {
                resolve(response.data.body?.data)
		        store.dispatch(showMessage('success', "User created successfully"))
            })
            .catch(error => {
		        store.dispatch(showMessage('error', "Something when wrong. Contact the administrator"))
                reject(error)
            })
    })
}

export const editUser = (data)  => async dispatch => {
    return new Promise(async (resolve, reject) => {
        return Http.put(process.env.REACT_APP_API_ADMIN_USER_LIST, data)
            .then(response => {
                resolve(response.data.body)
		        store.dispatch(showMessage('success', "User updated successfully"))
            })
            .catch(error => {
		        store.dispatch(showMessage('error', "Something when wrong. Contact the administrator"))
                reject(error)
            })
    })
}


export const deleteUser = (id) => {
    return new Promise( (resolve, reject) => {
        return Http.delete(process.env.REACT_APP_API_ADMIN_USER_LIST+id+"/")
            .then((res) => {
                resolve(res)
		        store.dispatch(showMessage('success', "User Delete successfully"))
            })
            .catch((err) => {
		        store.dispatch(showMessage('error', "Something when wrong. Contact the administrator"))
                reject(err)
            })
    })
}