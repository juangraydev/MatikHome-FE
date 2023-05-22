import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import UserData from '../modules/auth/store/reducer'
import alertMessage from '../router/store/reducer'
import homeData from '../modules/user/dashboard/store/reducer'
import adminData from '../modules/admin/store/reducer'

// add reducer in whitelist if you want to save to localStorage
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['UserData','homeData'],
}

const reducers = combineReducers({
	UserData,
	alertMessage,
	homeData,
	adminData,
})

export default persistReducer(persistConfig, reducers)
