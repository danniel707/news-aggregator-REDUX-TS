import { POSTS_ACTION_TYPES } from './posts.types'

const POSTS_INITIAL_STATE = {	
	posts: [], 
	loading: true,
}

export const postsReducer = (state = POSTS_INITIAL_STATE, action = {}) => {
	
	const { type, payload } = action;

	switch(type) {
		case POSTS_ACTION_TYPES.SET_POSTS:						
			return {
				...state,
				posts: payload,
				loading: false,
			};
		case POSTS_ACTION_TYPES.ADD_POST:			
			return {
				...state,
				posts: [payload, ...state.posts]
			};
		case POSTS_ACTION_TYPES.UPDATE_POST:			
			return {
				...state,
				posts: state.posts.map((post) =>
		          	post.id === payload.postId
		            ? { ...post, ...payload.updatedFields }
		            : post
		        ),
			};
		default:
			return state;
	}
}
