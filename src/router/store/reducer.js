import * as types from './actionTypes'

const initialState = {
	open: false,
	message: '',
	type: '', // success, warning, error, info
}

export default function reducer(state = initialState, action) {
	const { type, message, messageType } = action

	switch (type) {
		case types.SHOW_MESSAGE:
			return {
				...state,
				open: true,
				message: message || '',
				type: messageType || '',
			}
		case types.HIDE_MESSAGE:
			return {
				...state,
				open: false,
			}
		default:
			return state
	}
}
