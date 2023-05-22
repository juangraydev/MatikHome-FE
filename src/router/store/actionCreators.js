import * as types from './actionTypes'

export function showMessage(type, message) {
	return {
		type: types.SHOW_MESSAGE,
		message,
		messageType: type,
	}
}

export function hideMessage() {
	return {
		type: types.HIDE_MESSAGE,
	}
}
