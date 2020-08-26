import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import post__avatar from '../static/images/avatar.JPG';


const Post = ({ userName, caption, imageUrl }) => {
   

    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post__header__avatar'
                    alt='avatar'
                    src={ post__avatar }
                />
                <h3><strong>{userName}</strong></h3>
            </div>
            
            <img 
                className='post__image' 
                src={ imageUrl } 
                alt='photo' 
            />
            <h4 className='post__text'> <strong>{ userName }: </strong>{ caption }</h4>
        </div>
    )
}

export default Post 
