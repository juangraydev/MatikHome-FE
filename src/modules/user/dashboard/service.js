import Http from '../../../shared/util/Http'
import { 
    fetchHomeData,
    successHomeData,
    failHomeData,
    selectHome,
    selectRoom
} from './store/actionCreators'

import { store } from '../../../store/config'
import { showMessage } from '../../../router/store/actionCreators'
// get example

export const homeList = () => async dispatch => {
    dispatch(fetchHomeData())
    return Http.get(process.env.REACT_APP_API_HOUSE_LIST)
        .then(response => {
            console.log('[HOME LIST] Retrieving data: ', response.data.body?.data[0] ? response.data.body?.data[0] : {})
            dispatch(successHomeData(response.data.body?.data))
        })
        .catch(error => {
            console.log('[HOME LIST] Error: ', error)
            dispatch(failHomeData(error))
        })
    
}

export const addRoom = (home, data) => async dispatch => {
    let id = String(home?.id);
    return new Promise(async (resolve, reject) => {
        return Http.post(process.env.REACT_APP_API_HOUSE_LIST +`${id}/room/`, data)
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
