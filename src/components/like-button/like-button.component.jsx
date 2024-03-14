import React, { useState, useEffect } from 'react';

import { updatePost } from '../../store/posts/posts.action';
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'

import { fetchIfPostLiked, sumLike } from '../../utils/firebase/firebase.utils';

import './like-button.styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const LikeButton = ({ post }) => {
  
  const currentUser = useSelector(selectCurrentUser) 
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  //Call the function once when the component mounts.
  //Avoid creating a new function every time the component renders
  useEffect(() => {
    if (currentUser && post.id) {
      
      const fields = { postId: post.id, userId: currentUser.uid };
      const checkIfPostLiked = async () => {
        try {
          const isLiked = await fetchIfPostLiked(fields);
          setLiked(isLiked);
        } catch (error) {
          console.error('Error checking if post is liked:', error);
        }
      };
      checkIfPostLiked();
    }
  }, [currentUser, post.id]);  

  const handleLike = async () => {
  try {
    if (!currentUser) {
      alert('Please log in to give a like.'); // Display a message if user is not logged in
      return;
    }
    const fields = { postId: post.id, userId: currentUser.uid };
    let updatedLikes = post.likes;

    if (!liked) {
      // Like the post     
      updatedLikes += 1;
      setLiked(true);     
    } else {
      // Unlike the post
      updatedLikes -= 1;
      setLiked(false);      
    } 
   
    sumLike(post.id, liked, fields) //Update the post likes count in the db
    dispatch(updatePost(post.id, { likes: updatedLikes }));//Update the post likes count in the context  

  } catch (error) {
    console.error('Error liking post:', error);
    alert('An error occurred. Please try again later.'); // Error message
  }   
};

  return (
    <div className="like-container">
      <button 
        onClick={handleLike}
        className={classNames('like-button', { 'liked': liked })}>
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <span>{post.likes}</span>
    </div>
  );
};

export default LikeButton;
