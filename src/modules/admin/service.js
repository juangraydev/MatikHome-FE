import Http from '../../shared/util/Http'
import { 
    fetchSummaryData,
    successSummaryData,
    failSummaryData
} from './store/actionCreators'

// export const getAdminSummary = () => {
//     return new Promise( async (resolve, reject) => {
//         return Http.get(process.env.REACT_APP_API_ADMIN_SUMMARY)
//             .then((res) => {
//                 console.log("[users]", res?.data?.body?.data);
//                 resolve(res?.data?.body?.data)
//             })
//             .catch((err) => {
//                 reject(err)
//             })
//     })
// }




export const getAdminSummary = () => async dispatch => {
    dispatch(fetchSummaryData())
    return Http.get(process.env.REACT_APP_API_ADMIN_SUMMARY)
        .then(response => {
            console.log('[Admin Summary] Retrieving data: ',response.data.body?.data)
            dispatch(successSummaryData(response.data.body?.data))
        })
        .catch(error => {
            console.log('[Admin Summary] Error: ', error)
            dispatch(failSummaryData(error))
        })
    
}



export const getHomesAPI = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_HOUSE_LIST)
            .then((res) => {
                console.log("[Homes]", res?.data?.body?.data);
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
                console.log("[device]", res?.data?.body?.data);
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getUsersAPI = () => {
    return new Promise( async (resolve, reject) => {
        return Http.get(process.env.REACT_APP_API_USER_LIST)
            .then((res) => {
                console.log("[users]", res?.data?.body?.data);
                resolve(res?.data?.body?.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

// export const loginAPI = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         // dispatch(fetchLoginTokenData())
//         console.log("data", data);
//         return Http.post(process.env.REACT_APP_API_LOGIN, data)
//             .then(response => {
//                 console.log('[LOGIN] Retrieving token data',response.data.body?.data)
//                 localStorage.setItem("TOKEN", response.data.body?.data?.token)
//                 resolve()
//             })
//             .catch(error => {
//                 console.log('[LOGIN] Error token data', error)
//                 reject()
//             })
//     })
// }
// export const registerAPI = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         // dispatch(fetchLoginTokenData())
//         return Http.post(process.env.REACT_APP_API_REGISTER, data)
//             .then(response => {
//                 // logger('[REGISTER] Retrieving token data')
//                 resolve()
//             })
//             .catch(error => {
//                 // logger('[REGISTER] Error token data')
//             })
//     })
// }



//get example
// export function getDivSummary(divCode, reportID) {
// 	return function (dispatch) {
// 		return Http.get(
// 			process.env.REACT_APP_API_DIVISION_SUMMARY + divCode + '/' + reportID,
// 		)
// 	}
// }
