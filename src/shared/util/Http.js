import axios from 'axios'
// import * as types from './Constants'
// import { logger } from './Logger'
// import { history } from './../../router/Router'
import { store } from '../../store/config'
// import { setUserSessionExpired } from '../../modules/login/pages/store/actionCreators'
// import i18n from '../../i18n'
// import _ from 'lodash'
import { showMessage } from '../../router/store/actionCreators'

// create new instance
const Http = axios.create()

// set default config
Http.defaults.baseURL = process.env.REACT_APP_API_URL
Http.defaults.headers.common.Accept = 'application/json'

/**
 * intercept the requests
 */
Http.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		// If the header does not contain the token and the url not public, redirect to login
		// if token is found add it to the header
		let token = localStorage.getItem("TOKEN")
		config.headers.Authorization = token ? `Bearer ${token}` : ``

		return config
	},

	function (error) {
		// Do something with request error
		return Promise.reject(error)
	},
)

/**
 * intercept the response so we can handle the
 * expected exceptions from the API
 */
Http.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {

		return Promise.reject(error)
	},
)

export default Http
