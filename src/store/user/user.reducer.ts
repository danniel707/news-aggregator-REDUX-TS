import { AnyAction } from 'redux';

import { USER_ACTION_TYPES } from './user.types'

import { setCurrentUser, setUserData } from './user.action'

import { UserData } from '../../utils/firebase/firebase.utils'

export type UserState = {
	readonly currentUser: UserData | null;
	readonly userData: UserData | null;
	readonly error: Error | null;
}

const INITIAL_STATE = {
	currentUser: null,
	userData: null,
	error: null
}

export const userReducer = (
	state = INITIAL_STATE, 
	action: AnyAction
	) => {
	if(setCurrentUser.match(action)){
		return {
			...state,
			currentUser: action.payload
		}	
	}
	if(setUserData.match(action)){
		return {
			...state,
			userData: action.payload
		}	
	}
	return state;
}
