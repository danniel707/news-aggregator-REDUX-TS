import { AnyAction } from 'redux';

import { setCurrentUser, setUserData, setSignUpLoading } from './user.action'

import { UserData } from '../../utils/firebase/firebase.utils'

export type UserState = {
	readonly currentUser: UserData | null;
	readonly userData: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
}

const INITIAL_STATE = {
	currentUser: null,
	userData: null,
	isLoading: false,
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
	if(setSignUpLoading.match(action)){
		return {
			...state,
			isLoading: action.payload
		}	
	}
	return state;
}
