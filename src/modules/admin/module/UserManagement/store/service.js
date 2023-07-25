import Http from '../../../../../shared/util/Http'

import { store } from '../../../../../store/config'
import { showMessage } from '../../../../../router/store/actionCreators'

export const getUserList = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_USER_LIST)
            .then((res) => {
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}