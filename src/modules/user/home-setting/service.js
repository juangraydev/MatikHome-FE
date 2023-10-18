import Http from '../../../shared/util/Http'
import { 
    fetchHomeData,
    successHomeData,
    failHomeData,
    selectHome,
    selectRoom,
    fetchHomeDevice,
    successHomeDevice,
    failHomeDevice
} from './store/actionCreators'

import { store } from '../../../store/config'
import { showMessage } from '../../../router/store/actionCreators'
// get example

export const homeList = () => async dispatch => {
    dispatch(fetchHomeData())
    return Http.get(process.env.REACT_APP_API_HOUSE_LIST)
        .then(response => {
            console.log("[home list]",response.data.body?.data);
            dispatch(successHomeData(response.data.body?.data))
        })
        .catch(error => {
            dispatch(failHomeData(error))
        })
    
}

export const addHome = (data) => async dispatch => {
    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_HOUSE_LIST, data)
            .then(response => {
                dispatch(homeList())
		        store.dispatch(showMessage('success', "Home Added Successfully"))
                resolve();
            })
            .catch(error => {
                reject()
            })
    })
}

export const editHome = (data) => async dispatch => {
    return new Promise(async (resolve, reject) => {
        return Http.put(process.env.REACT_APP_API_HOUSE_LIST, data)
            .then(response => {
                dispatch(homeList())
		        store.dispatch(showMessage('success', "Home Edited Successfully"))
                resolve();
            })
            .catch(error => {

                reject()
            })
    })
}

export const addRoom = (home, data) => async dispatch => {
    let req_data = {
        home_id: String(home?.id),
        room: data
    }
    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_HOUSE_LIST +`room/`, req_data)
            .then(response => {
                dispatch(homeList())
		        store.dispatch(showMessage('success', "Room Added Successfully"))
                resolve();
            })
            .catch(error => {
                reject()
            })
    })
}

export const editRoom = (data) => async dispatch => {
    return new Promise(async (resolve, reject) => {
        return Http.put(process.env.REACT_APP_API_HOUSE_LIST +`room/`, data)
            .then(response => {
                dispatch(homeList())
		        store.dispatch(showMessage('success', "Room Edited Successfully"))
                resolve();
            })
            .catch(error => {

                reject()
            })
    })
}

export const deleteRoom = (id) => async dispatch => {
    return new Promise(async (resolve, reject) => {
        return Http.delete(process.env.REACT_APP_API_HOUSE_LIST +`room/${id}`)
            .then(response => {
                dispatch(homeList())
		        store.dispatch(showMessage('success', "Room Deleted Successfully"))
                resolve();
            })
            .catch(error => {
                reject()
            })
    })
}

export const deviceList = (home_id) => async dispatch => {
    dispatch(failHomeDevice())
    return Http.get(process.env.REACT_APP_API_DEVICE_LIST+`${home_id}/`)
        .then(response => {
            dispatch(successHomeDevice(response.data.body?.data))
        })
        .catch(error => {
            dispatch(failHomeDevice(error))
        })
    
}