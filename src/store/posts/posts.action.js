import { POSTS_ACTION_TYPES } from './posts.types'
import { createAction } from "../../utils/reducer/reducer.utils";

export const setPosts = (posts) => 
	createAction(POSTS_ACTION_TYPES.SET_POSTS, posts);

export const addPost = (newPost) => {
    return createAction(POSTS_ACTION_TYPES.ADD_POST, newPost);
};

export const updatePost = (postId, updatedFields) => {
    return createAction(POSTS_ACTION_TYPES.UPDATE_POST, {postId, updatedFields});
};