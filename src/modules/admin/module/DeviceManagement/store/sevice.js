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