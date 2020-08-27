import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar';
import post__avatar from '../static/images/avatar.JPG';
import BookmarkBorderSharpIcon from '@material-ui/icons/BookmarkBorderSharp';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';


const Post = ({ postId, username, caption, imageUrl }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe();
        };
    },[postId])

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post__header__avatar'
                    alt='avatar'
                    src={ post__avatar }
                />
                <h3><strong>{username}</strong></h3>
            </div>
            
            <img 
                className='post__image' 
                src={ imageUrl } 
                alt='photo' 
            />

            <div className='post__iconBar'> 
                <FavoriteBorderSharpIcon className='post__iconBar__icon' fontSize='large'/>
                <ChatBubbleOutlineOutlinedIcon className='post__iconBar__icon' fontSize='large'/>
                <NearMeOutlinedIcon className='post__iconBar__icon' fontSize='large'/>
                <BookmarkBorderSharpIcon className='post__iconBar__icon post__iconBar__markIcon' fontSize='large'/>
            </div>

            <h4 className='post__text'> <strong>{ username }: </strong>{ caption }</h4>
            
            <div className='post__comments'>
                {comments.map(comment => (
                    <p>
                        <strong>{comment.username} </strong>
                        {comment.text}
                    </p>
                ))}
               
            </div>
            
            
        </div>
    )
}

export default Post 
