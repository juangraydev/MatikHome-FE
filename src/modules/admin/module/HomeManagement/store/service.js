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