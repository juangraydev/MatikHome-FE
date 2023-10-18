import Http from '../../shared/util/Http'
import { 
    fetchSummaryData,
    successSummaryData,
    failSummaryData
} from './store/actionCreators'

export const getAdminSummary = () => async dispatch => {
    dispatch(fetchSummaryData())
    return Http.get(process.env.REACT_APP_API_ADMIN_SUMMARY)
        .then(response => {
            dispatch(successSummaryData(response.data.body?.data))
        })
        .catch(error => {
            dispatch(failSummaryData(error))
        })
    
}



export const getHomesAPI = () => {
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

export const getDeviceAPI = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_DEVICE_LIST)
            .then((res) => {
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getUsersAPI = () => {
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
