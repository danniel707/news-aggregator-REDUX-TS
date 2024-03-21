import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/user/user.selector'

import { fetchIfPostLiked, sumLike, getPostLikesQuantity } from '../../utils/firebase/firebase.utils';

import './like-button.styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const LikeButton = ({ post }) => {
  
  const currentUser = useSelector(selectCurrentUser) 
  const [liked, setLiked] = useState(false);
  const [likesQuantity, setLikesQuantity] = useState(null);
     
  //Call the function once when the component mounts.
  //Avoid creating a new function every time the component renders
  useEffect(() => {    
    const fetchLikesInfo  = async () => {
      try {
        if (currentUser) {      
          const fields = { postId: post.id, userId: currentUser.uid };
          const isLiked = await fetchIfPostLiked(fields);
          setLiked(isLiked);
        } 
        const quantity = await getPostLikesQuantity(post.id);         
        setLikesQuantity(quantity);    
                    
      } catch (error) {
        console.error('Error checking Likes info:', error);
      }
    };
    fetchLikesInfo ();    
  }, [currentUser, post]);  
   
  const handleLike = async () => {
    try {
      if (!currentUser) {
        alert('Please log in to give a like.'); // Display a message if user is not logged in
        return;
      }
      const fields = { postId: post.id, userId: currentUser.uid };
      let quantity = await getPostLikesQuantity(post.id)
     
      if (!liked) {        
        // Like the post     
        quantity += 1;
        setLiked(true);     
      } else {        
        // Unlike the post
        quantity -= 1;
        setLiked(false);      
      } 
      
      sumLike(liked, fields) //Update the post likes count in the db
      setLikesQuantity(quantity);
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
      <span>{likesQuantity}</span>
    </div>
  );
};

export default LikeButton;
